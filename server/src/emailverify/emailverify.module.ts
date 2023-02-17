import { Module } from '@nestjs/common';
import { EmailverifyService } from './emailverify.service';
import { EmailverifyController } from './emailverify.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [EmailverifyController],
  providers: [EmailverifyService],
  exports: [EmailverifyService],
})
export class EmailverifyModule {}
