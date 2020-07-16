import { Test } from '@nestjs/testing';

import Decimal from 'decimal.js';

import { BookKeeperCalculationController } from './book-keeper-calculation.controller';
import { BookKeeperCalculationService } from './book-keeper-calculation.service';

jest.mock('./calculation.helper', () => ({
  CalculationHelper: {
    calculatePayments: jest.fn(() => ({
      paymentAmountPerPeriod: new Decimal('128.54'),
      payments: [
        {
          balance: 877.71,
          base: 122.29,
          date: '15948931918340',
          interest: 6.25,
        },
        {
          balance: 754.66,
          base: 123.05,
          date: '15948931918342592000000',
          interest: 5.49,
        },
        {
          balance: 630.84,
          base: 123.82,
          date: '15948931918345184000000',
          interest: 4.72,
        },
        {
          balance: 506.24,
          base: 124.6,
          date: '15948931918347776000000',
          interest: 3.94,
        },
        {
          balance: 380.86,
          base: 125.38,
          date: '159489319183410368000000',
          interest: 3.16,
        },
        {
          balance: 254.7,
          base: 126.16,
          date: '159489319183412960000000',
          interest: 2.38,
        },
        {
          balance: 127.75,
          base: 126.95,
          date: '159489319183415552000000',
          interest: 1.59,
        },
        {
          balance: 0.01,
          base: 127.74,
          date: '159489319183418144000000',
          interest: 0.8,
        },
      ],
    })),
  },
}));

describe('BookKeeperCalculationController', () => {
  const serviceMock = {
    findOneById: jest.fn(() => Promise.resolve({ rate: 0.075 })),
    getChunk: jest.fn(() => Promise.resolve([{}])),
  };
  let controller: BookKeeperCalculationController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: BookKeeperCalculationService,
          useValue: serviceMock,
        },
      ],
      controllers: [BookKeeperCalculationController],
    }).compile();

    controller = module.get(BookKeeperCalculationController);
  });

  it('should have getLoans() which returns chunk of loans', async () => {
    const { getChunk } = serviceMock;
    const result = await controller.getLoans({ skip: 1, take: 1 });

    expect(result).toEqual([{}]);
    expect(getChunk).toBeCalledWith(1, 1);
  });

  it('should have calculatePaybackPlan() which returns payback plan', async () => {
    const { findOneById } = serviceMock;
    const result = await controller.calculatePaybackPlan({
      months: 8,
      amount: 1000,
      startDate: '1594893191834',
      loanId: 1,
      scoring: 100,
    });

    expect(result).toEqual({
      allInterest: 28.33,
      allToRepay: 1028.32,
      id: expect.any(Number),
      latPaymentDate: '159489319183418144000000',
      payments: [
        {
          balance: 877.71,
          base: 122.29,
          date: '15948931918340',
          interest: 6.25,
        },
        {
          balance: 754.66,
          base: 123.05,
          date: '15948931918342592000000',
          interest: 5.49,
        },
        {
          balance: 630.84,
          base: 123.82,
          date: '15948931918345184000000',
          interest: 4.72,
        },
        {
          balance: 506.24,
          base: 124.6,
          date: '15948931918347776000000',
          interest: 3.94,
        },
        {
          balance: 380.86,
          base: 125.38,
          date: '159489319183410368000000',
          interest: 3.16,
        },
        {
          balance: 254.7,
          base: 126.16,
          date: '159489319183412960000000',
          interest: 2.38,
        },
        {
          balance: 127.75,
          base: 126.95,
          date: '159489319183415552000000',
          interest: 1.59,
        },
        {
          balance: 0.01,
          base: 127.74,
          date: '159489319183418144000000',
          interest: 0.8,
        },
      ],
      scoringInfluence: -8,
    });
    expect(findOneById).toBeCalledWith(1);
  });
});
