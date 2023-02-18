import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { IdieaService } from './idiea.service';
import { CreateIdieaDto } from './dto/create-idiea.dto';
import { UpdateIdieaDto } from './dto/update-idiea.dto';
import { Idiea } from '@prisma/client';
import { JwtAuthGuardApi } from 'src/auth/guards/jwt-auth.guard';
import { CategoryService } from 'src/category/category.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { EmailverifyService } from 'src/emailverify/emailverify.service';

@Controller('idiea')
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
    const newIdiea = await this.idieaService.createNewIdiea(createIdieaDto);

    //create new Document and connect to this Idiea
    files.forEach(async (file) => {
      await this.fileService.uploadFileWithIdieaPost(
        file.buffer,
        file.originalname,
        newIdiea.id,
      );
    });
    //send email notify
    await this.emailService.sendMailNotifyForCreateNewIdiea({
      userId: req.user.userId,
      content: newIdiea.content,
      closeIdieaAt: newIdiea.closeIdieaAt,
      closeCommentAt: newIdiea.closeCommentAt,
    });

    return newIdiea;
  }

  @Get()
  findAll() {
    return this.idieaService.findAll();
  }
}
