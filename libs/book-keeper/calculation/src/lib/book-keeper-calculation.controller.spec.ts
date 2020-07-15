import { Test } from '@nestjs/testing';

import { BookKeeperCalculationController } from './book-keeper-calculation.controller';
import { BookKeeperCalculationService } from './book-keeper-calculation.service';

describe('BookKeeperCalculationController', () => {
  let controller: BookKeeperCalculationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BookKeeperCalculationService],
      controllers: [BookKeeperCalculationController],
    }).compile();

    controller = module.get(BookKeeperCalculationController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
