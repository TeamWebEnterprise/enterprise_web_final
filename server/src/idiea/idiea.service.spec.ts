import { Test, TestingModule } from '@nestjs/testing';
import { IdieaService } from './idiea.service';

describe('IdieaService', () => {
  let service: IdieaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdieaService],
    }).compile();

    service = module.get<IdieaService>(IdieaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
