import { Test, TestingModule } from '@nestjs/testing';
import { EmailverifyService } from './emailverify.service';

describe('EmailverifyService', () => {
  let service: EmailverifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailverifyService],
    }).compile();

    service = module.get<EmailverifyService>(EmailverifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
