import { CalculatePaybackPlanMessage, PaybackPlanInterface } from '@miku-credit/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Observable } from 'rxjs';

@Injectable()
export class ApiPaybackService {
  constructor(@Inject('CALCULATION_SERVICE') private readonly calculationServiceClient: ClientKafka) {}

  public calculatePaybackPlan(calculationData: CalculatePaybackPlanMessage): Observable<PaybackPlanInterface> {
    return this.calculationServiceClient.send<PaybackPlanInterface, CalculatePaybackPlanMessage>(
      'payback.calculate',
      calculationData
    );
  }
}
