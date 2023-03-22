import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { IdieaModule } from './idiea/idiea.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { getMaxListeners } from 'process';
import { EmailverifyModule } from './emailverify/emailverify.module';
import { FileModule } from './file/file.module';
import { CategoryModule } from './category/category.module';
import path from 'path';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    IdieaModule,
    MailerModule.forRoot({
      transport:
        'smtps://khoavvgcd191275@fpt.edu.vn:Vovankhoa191275@@smtp.gmail.com',
      defaults: {
        from: 'khoavvgcd191275@fpt.edu.vn',
      },
      template: {
        dir: __dirname + '/templates/email',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    EmailverifyModule,
    FileModule,
    CategoryModule,
    CommentModule,
    PrismaModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
