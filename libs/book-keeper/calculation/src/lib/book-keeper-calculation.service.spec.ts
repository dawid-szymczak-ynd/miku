import { Test } from '@nestjs/testing';

import { BookKeeperCalculationService } from './book-keeper-calculation.service';

describe('BookKeeperCalculationService', () => {
  let service: BookKeeperCalculationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BookKeeperCalculationService],
    }).compile();

    service = module.get(BookKeeperCalculationService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
