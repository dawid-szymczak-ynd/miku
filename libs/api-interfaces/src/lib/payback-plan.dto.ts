import { CalculatePaybackPlanMessage, PaybackPlanInterface, Payments } from '@miku-credit/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CalculatePaybackPlanBody implements CalculatePaybackPlanMessage {
  @ApiProperty({ description: 'Load ID', required: true })
  public loanId: number;

  @ApiProperty({ description: 'Amount of money to borrow', required: true })
  public amount: number;

  @ApiProperty({ description: 'Number of months to back a loan', required: true })
  public months: number;

  @ApiProperty({ description: 'Start date of taking the loan in milliseconds since Unix Epoch', required: true })
  public startDate: string;

  @ApiProperty({ description: 'Current clients scoring', required: true, minimum: 1 })
  public scoring: number;
}

export class Payment implements Payments {
  @ApiProperty({ description: 'Date of payment' })
  public date: string;

  @ApiProperty({ description: 'Base to repay' })
  public base: number;

  @ApiProperty({ description: 'Interest to repay' })
  public interest: number;

  @ApiProperty({ description: 'Balance after this payment' })
  public balance: number;
}

export class PaybackPlan implements PaybackPlanInterface {
  @ApiProperty({ description: 'PaybackPlan ID' })
  public id: number;

  @ApiProperty({ description: 'Array of the payments', type: [Payment] })
  public payments: Payment[];

  @ApiProperty({ description: 'Date of the last payment in milliseconds since Unix Epoch' })
  public latPaymentDate: string;

  @ApiProperty({ description: 'Amount of money to repay' })
  public allToRepay: number;

  @ApiProperty({ description: 'All interest to repay' })
  public allInterest: number;

  @ApiProperty({ description: 'Value of the change clients scoring' })
  public scoringInfluence: number;
}
