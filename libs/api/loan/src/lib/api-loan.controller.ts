import { GetLoansPageQuery, Loan } from '@miku-credit/api-interfaces';
import { Controller, Get, Inject, OnModuleInit, Query, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

import { Observable } from 'rxjs';

import { ApiLoanService } from './api-loan.service';

@UseGuards(AuthGuard('google'))
@Controller('loan')
export class ApiLoanController implements OnModuleInit {
  constructor(
    @Inject('CALCULATION_SERVICE') private readonly calculationServiceClient: ClientKafka,
    private readonly apiLoanService: ApiLoanService
  ) {}

  public onModuleInit(): void {
    this.calculationServiceClient.subscribeToResponseOf('loans.getChunk');
  }

  @Get('')
  public getLoansPage(@Query() { page }: GetLoansPageQuery): Observable<Loan[]> {
    return this.apiLoanService.getLoans(page);
  }
}
