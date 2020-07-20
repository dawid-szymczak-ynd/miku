import { Test } from '@nestjs/testing';

import { Repository } from 'typeorm';

import { BookKeeperCalculationService } from './book-keeper-calculation.service';

jest.mock('@nestjs/typeorm', () => ({
  InjectRepository: () => () => ({}),
}));

describe('BookKeeperCalculationService', () => {
  const mockRepository = {
    find: jest.fn(() => Promise.resolve([{}])),
    findOne: jest.fn(() => Promise.resolve({})),
  };
  let service: BookKeeperCalculationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BookKeeperCalculationService, { provide: Repository, useValue: mockRepository }],
    }).compile();

    service = module.get(BookKeeperCalculationService);
  });

  it('should have getChunk() which returns LoanEntities', async () => {
    const result = await service.getChunk(1, 0);
    const { find } = mockRepository;

    expect(result).toEqual([{}]);
    expect(find).toBeCalledWith({
      order: {
        id: 'ASC',
      },
      relations: ['type'],
      skip: 0,
      take: 1,
    });
  });

  it('should have findOneById() which returns LoanEntity', async () => {
    const result = await service.findOneById(1);
    const { findOne } = mockRepository;

    expect(result).toEqual({});
    expect(findOne).toBeCalledWith({
      where: {
        id: 1,
      },
    });
  });
});
