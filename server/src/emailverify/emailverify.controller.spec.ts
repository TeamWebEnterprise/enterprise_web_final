import { Test, TestingModule } from '@nestjs/testing';
import { EmailverifyController } from './emailverify.controller';
import { EmailverifyService } from './emailverify.service';

describe('EmailverifyController', () => {
  let controller: EmailverifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailverifyController],
      providers: [EmailverifyService],
    }).compile();

    controller = module.get<EmailverifyController>(EmailverifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
