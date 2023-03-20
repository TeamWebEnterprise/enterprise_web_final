import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IdieaService } from './idiea.service';
import { CreateIdieaDto } from './dto/create-idiea.dto';
import { JwtAuthGuardApi } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { EmailverifyService } from 'src/emailverify/emailverify.service';
import { CreateLikeDto } from './dto/create-like.input';
import { UpdateIdieaDto } from './dto/update-idiea.input';
import { DeleteIdieaDto } from './dto/delete-idiea.input';
import { Roles } from 'src/decorater/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { Role } from 'src/user/entities/role.enum';
import { MakeIdieaPublishDto } from './dto/make-publish-idiea.input';

@Controller('idieas')
export class IdieaController {
  constructor(
    private readonly idieaService: IdieaService,
    private fileService: FileService,
    private emailService: EmailverifyService,
  ) {}

  @UseGuards(JwtAuthGuardApi)
  @Post('createidiea')
  @UseInterceptors(FilesInterceptor('files[]', 20))
  async createIdiea(
    @Req() req,
    @Body() createIdieaDto: CreateIdieaDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    //create new Idiea
    const newIdiea = await this.idieaService.createNewIdiea(
      createIdieaDto,
      req.user.userId,
    );

    //create new Document and connect to this Idiea
    if (files) {
      files.forEach(async (file) => {
        await this.fileService.uploadFileWithIdieaPost(
          file.buffer,
          file.originalname,
          newIdiea.id,
        );
      });
    }

    //send email notify
    await this.emailService.sendMailNotifyForCreateNewIdiea({
      userId: req.user.userId,
      content: newIdiea.content,
      closeIdieaAt: newIdiea.closeIdieaAt,
      closeCommentAt: newIdiea.closeCommentAt,
    });

    return newIdiea;
  }

  @Get('all')
  findAll(
    @Query('order-field') orderField: string,
    @Query('orderby') orderBy: string,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return this.idieaService.findAll(orderField, orderBy, page);
  }

  @Get('all-by-likes')
  findAllSortByLike(@Query('page', ParseIntPipe) page: number) {
    return this.idieaService.findAllSortByLike(page);
  }

  @UseGuards(JwtAuthGuardApi)
  @Post('like')
  likeIdiea(@Req() req, @Body() createLikeDto: CreateLikeDto) {
    return this.idieaService.like(req.user.userId, createLikeDto);
  }

  @UseGuards(JwtAuthGuardApi, RolesGuard)
  @Post('update')
  @Roles(Role.ADMINSTRATOR, Role.QA_MANAGER, Role.STAFF)
  @UseInterceptors(FilesInterceptor('files[]', 20))
  async updateIdiea(
    @Body() updateIdieaDto: UpdateIdieaDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req,
  ) {
    const checkAdmin = req.user.roles.some((role) => {
      return ['Adminstrator', 'Quality Assurance Manager'].includes(role);
    });

    if (checkAdmin == false) {
      const check = await this.idieaService.checkUserIsOwner(
        req.user.userId,
        updateIdieaDto.idieaId,
      );

      if (check == false) {
        throw new HttpException(
          'Un Authorizer, not your own idiea or you are not Admin',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    const updatedIdiea = await this.idieaService.updateIdiea(updateIdieaDto);

    //make new documents
    if (files) {
      console.log('edit file');
      await this.idieaService.deleteAllDocument(updateIdieaDto.idieaId);

      files.forEach(async (file) => {
        await this.fileService.uploadFileWithIdieaPost(
          file.buffer,
          file.originalname,
          updatedIdiea.id,
        );
      });
    }
    return updatedIdiea;
  }

  @UseGuards(JwtAuthGuardApi, RolesGuard)
  @Post('delete')
  @Roles(Role.ADMINSTRATOR, Role.QA_MANAGER, Role.STAFF)
  async deleteIdiea(@Body() deleteIdieaDto: DeleteIdieaDto, @Req() req) {
    if ('Staff'.includes(req.user.roles)) {
      const check = await this.idieaService.checkUserIsOwner(
        req.user.userId,
        deleteIdieaDto.idieaId,
      );
      console.log(check);

      if (!check) {
        throw new HttpException(
          'Un Authorizer, not your own idiea or you are not Admin',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    return this.idieaService.deleteIdiea(deleteIdieaDto);
  }

  @UseGuards(JwtAuthGuardApi, RolesGuard)
  @Post('publish')
  @Roles(Role.STAFF)
  publishIdiea(@Body() makeIdieaPublishDto: MakeIdieaPublishDto) {
    return this.idieaService.makePublishIdiea(makeIdieaPublishDto);
  }

  @Get('get-idiea-by-point')
  getAllIdieasByLikePoint(@Query('page', ParseIntPipe) page: number) {
    return this.idieaService.getAllIdieasByLikePoint(page);
  }

  @Get('idieas-lastest-comment')
  getAllIdieasByLastestComment(@Query('page', ParseIntPipe) page: number) {
    return this.idieaService.getAllIdieaByLastestComment(page);
  }

  @Get('all-idieas-by-user')
  getAllIdieasByUser(
    @Query('page', ParseIntPipe) page: number,
    @Query('userid', ParseIntPipe) userId: number,
  ) {
    return this.idieaService.getAllIdieasByUser(page, userId);
  }
}
