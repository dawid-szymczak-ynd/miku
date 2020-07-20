import {
  CalculatePaybackPlanMessage,
  LoanInterface,
  LoansGetChunkMessage,
  PaybackPlanInterface,
} from '@miku-credit/api-interfaces';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { Decimal } from 'decimal.js';

import { BookKeeperCalculationService } from './book-keeper-calculation.service';
import { CalculationHelper } from './calculation.helper';

@Controller('book-keeper-calculation')
export class BookKeeperCalculationController {
  constructor(private readonly bookKeeperCalculationService: BookKeeperCalculationService) {}

  @MessagePattern('payback.calculate')
  public calculatePaybackPlan(
    @Payload() { value }: { value: CalculatePaybackPlanMessage }
  ): Promise<PaybackPlanInterface> {
    return this.bookKeeperCalculationService.findOneById(value.loanId).then((loan) => {
      const { payments, paymentAmountPerPeriod } = CalculationHelper.calculatePayments(loan.rate, value);
      const allInterest = Number(
        // tslint:disable-next-line:no-parameter-reassignment
        payments.reduce((cur, prev) => (cur = cur.add(prev.interest)), new Decimal(0)).toFixed(2)
      );
      const allToRepay = Number(paymentAmountPerPeriod.mul(value.months).toFixed(2));

      return {
        payments,
        allInterest,
        allToRepay,
        id: Date.now(),
        scoringInfluence: -value.months,
        latPaymentDate: payments[payments.length - 1].date,
      };
    });
  }

  @MessagePattern('loans.getChunk')
  public getLoans(@Payload() { value }: { value: LoansGetChunkMessage }): Promise<LoanInterface[]> {
    return this.bookKeeperCalculationService.getChunk(value.take, value.skip);
  }
}
