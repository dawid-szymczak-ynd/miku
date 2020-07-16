import Decimal from 'decimal.js';

import { CalculationHelper } from './calculation.helper';

describe('CalculationHelper', () => {
  it('should have calculatePayments() which return list of payments', () => {
    const rate = 0.075;

    expect(
      CalculationHelper.calculatePayments(rate, {
        months: 8,
        amount: 1000,
        startDate: '1594893191834',
        loanId: 1,
        scoring: 100,
      })
    ).toEqual({
      paymentAmountPerPeriod: new Decimal('128.54'),
      payments: [
        {
          balance: 877.71,
          base: 122.29,
          date: '1594893191834',
          interest: 6.25,
        },
        {
          balance: 754.66,
          base: 123.05,
          date: '1597485191834',
          interest: 5.49,
        },
        {
          balance: 630.84,
          base: 123.82,
          date: '1600077191834',
          interest: 4.72,
        },
        {
          balance: 506.24,
          base: 124.6,
          date: '1602669191834',
          interest: 3.94,
        },
        {
          balance: 380.86,
          base: 125.38,
          date: '1605261191834',
          interest: 3.16,
        },
        {
          balance: 254.7,
          base: 126.16,
          date: '1607853191834',
          interest: 2.38,
        },
        {
          balance: 127.75,
          base: 126.95,
          date: '1610445191834',
          interest: 1.59,
        },
        {
          balance: 0.01,
          base: 127.74,
          date: '1613037191834',
          interest: 0.8,
        },
      ],
    });
  });
});
