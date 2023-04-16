import { Test, TestingModule } from '@nestjs/testing';
import { IdieaController } from './idiea.controller';
import { IdieaService } from './idiea.service';

describe('IdieaController', () => {
  let controller: IdieaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdieaController],
      providers: [IdieaService],
    }).compile();

    controller = module.get<IdieaController>(IdieaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
