import { Controller, Get, Query } from '@nestjs/common';
import { EmailverifyService } from './emailverify.service';

@Controller('emailverify')
export class EmailverifyController {
  constructor(private readonly emailverifyService: EmailverifyService) {}

  @Get()
  async emailVerifyToKen(@Query('token') token: string) {
    const email = await this.emailverifyService.decodeConfirmationToken(token);
    return this.emailverifyService.confirmVerify(email);
  }
}
