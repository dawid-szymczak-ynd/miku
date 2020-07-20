import { GetLoansPageQuery, Loan } from '@miku-credit/api-interfaces';
import { GoogleAuthenticatedGuard } from '@miku-credit/api/auth';
import { Controller, Get, Inject, OnModuleInit, Query, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ApiLoanService } from './api-loan.service';

@UseGuards(new GoogleAuthenticatedGuard())
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
  @ApiResponse({ status: 200, type: [Loan] })
  public getLoansPage(@Query() { page }: GetLoansPageQuery): Observable<Loan[]> {
    return this.apiLoanService.getLoans(page);
  }
}
