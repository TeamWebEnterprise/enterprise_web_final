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
} from '@nestjs/common';
import { IdieaService } from './idiea.service';
import { CreateIdieaDto } from './dto/create-idiea.dto';
import { JwtAuthGuardApi } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { EmailverifyService } from 'src/emailverify/emailverify.service';
import { CreateLikeDto } from './dto/create-like.input';

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
}
