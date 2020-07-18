import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalculatePaybackPlanBody, PaybackPlanInterface } from '@miku-credit/api-interfaces';

import { Observable } from 'rxjs';

@Injectable()
export class PaybackService {
  constructor(private readonly httpClient: HttpClient) {}

  public calculatePaybackPlan(calculatePaybackPlanBody: CalculatePaybackPlanBody): Observable<PaybackPlanInterface> {
    return this.httpClient.post<PaybackPlanInterface>('/api/payback/calculate', calculatePaybackPlanBody, {
      withCredentials: true,
    });
  }
}
