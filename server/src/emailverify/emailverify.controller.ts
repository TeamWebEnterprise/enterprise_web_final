import { Controller } from '@nestjs/common';
import { EmailverifyService } from './emailverify.service';

@Controller('emailverify')
export class EmailverifyController {
  constructor(private readonly emailverifyService: EmailverifyService) {}
}
