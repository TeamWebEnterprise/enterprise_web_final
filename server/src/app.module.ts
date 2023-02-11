import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    /* {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }, */
  ],
})
export class AppModule {}
