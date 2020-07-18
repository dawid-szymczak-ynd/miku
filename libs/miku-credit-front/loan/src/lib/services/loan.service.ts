import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanInterface } from '@miku-credit/api-interfaces';

import { Observable } from 'rxjs';

@Injectable()
export class LoanService {
  constructor(private readonly httpClient: HttpClient) {}

  public getLoansPage(page: number): Observable<LoanInterface[]> {
    return this.httpClient.get<LoanInterface[]>(`/api/loan?page=${page}`, { withCredentials: true });
  }
}
