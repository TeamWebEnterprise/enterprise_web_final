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
import path from 'path';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    IdieaModule,
    MailerModule.forRoot({
      transport:
        'smtps://quocldgcd191316@fpt.edu.vn:kbgbahsswqbttznd@smtp.gmail.com',
      defaults: {
        from: '"nest-modules" <quocldgcd191316@fpt.edu.vn>',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
