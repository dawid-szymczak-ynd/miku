import { CalculatePaybackPlanMessage, Payments } from '@miku-credit/api-interfaces';

import { Decimal } from 'decimal.js';

const millisecondsInMonth = 2592000000;
const monthsInYear = 12;

export class CalculationHelper {
  public static calculatePayments(
    interestRate: number,
    { months, amount, startDate }: CalculatePaybackPlanMessage
  ): { payments: Payments[]; paymentAmountPerPeriod: Decimal } {
    const payments: Payments[] = [];
    const interestRatePerPeriod = new Decimal(interestRate).div(monthsInYear);
    const paymentAmountPerPeriod = CalculationHelper.getPaymentAmountPerPeriod(interestRatePerPeriod, months, amount);
    let currentBalance = new Decimal(amount);

    for (let i = 0; i < months; i++) {
      const interest = Number(interestRatePerPeriod.mul(currentBalance).toFixed(2));
      const base = Number(paymentAmountPerPeriod.minus(interest).toFixed(2));
      const date = String(Number(startDate) + i * millisecondsInMonth);
      const balance = Number(currentBalance.minus(base).toFixed(2));
      currentBalance = new Decimal(balance);

      payments.push({
        interest,
        base,
        date,
        balance,
      });
    }

    return { payments, paymentAmountPerPeriod };
  }

  private static getPaymentAmountPerPeriod(
    interestRatePerPeriod: Decimal,
    numberOfMonths: number,
    paymentAmount: number
  ): Decimal {
    const interestPoweredByMonths = interestRatePerPeriod.plus(1).pow(numberOfMonths);
    const amount = new Decimal(paymentAmount);

    return new Decimal(
      amount.mul(interestRatePerPeriod.mul(interestPoweredByMonths).div(interestPoweredByMonths.minus(1))).toFixed(2)
    );
  }
}
