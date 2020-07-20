import { LoanInterface } from '@miku-credit/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class GetLoansPageQuery {
  @ApiProperty({ description: 'Page index', minimum: 0, default: 0 })
  public page: number;
}

export class Loan implements LoanInterface {
  @ApiProperty({ description: 'Loan ID' })
  public id?: number;

  @ApiProperty({ description: 'Loan Type ID' })
  public type_id: number;

  @ApiProperty({ description: 'Name of the loan' })
  public name: string;

  @ApiProperty({ description: 'Maximum number of duration in months' })
  public max_length: number;

  @ApiProperty({ description: 'Minimum number of duration in months' })
  public min_length: number;

  @ApiProperty({ description: 'Maximum amount of money to borrow' })
  public max_amount: number;

  @ApiProperty({ description: 'Minimum amount of money to borrow' })
  public min_amount: number;

  @ApiProperty({ description: 'Yearly interest value' })
  public rate: number;

  @ApiProperty({ description: 'Minimum scoring required to be able apply for this type of loan' })
  public recuired_scoring: number;
}
