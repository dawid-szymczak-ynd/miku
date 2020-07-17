import { LoanInterface, LoansGetChunkMessage } from '@miku-credit/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Observable } from 'rxjs';

const LOANS_PER_PAGE = 10;

@Injectable()
export class ApiLoanService {
  constructor(@Inject('CALCULATION_SERVICE') private readonly calculationServiceClient: ClientKafka) {}

  public getLoans(page: number = 0): Observable<LoanInterface[]> {
    return this.calculationServiceClient.send<LoanInterface[], LoansGetChunkMessage>('loans.getChunk', {
      take: LOANS_PER_PAGE,
      skip: LOANS_PER_PAGE * page,
    });
  }
}
