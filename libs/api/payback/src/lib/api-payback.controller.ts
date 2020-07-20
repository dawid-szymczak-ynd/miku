import { CalculatePaybackPlanBody, PaybackPlan } from '@miku-credit/api-interfaces';
import { GoogleAuthenticatedGuard } from '@miku-credit/api/auth';
import { Body, Controller, Inject, OnModuleInit, Post, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ApiPaybackService } from './api-payback.service';

@UseGuards(new GoogleAuthenticatedGuard())
@Controller('payback')
export class ApiPaybackController implements OnModuleInit {
  constructor(
    @Inject('CALCULATION_SERVICE') private readonly calculationServiceClient: ClientKafka,
    private readonly apiPaybackService: ApiPaybackService
  ) {}

  public onModuleInit(): void {
    this.calculationServiceClient.subscribeToResponseOf('payback.calculate');
  }

  @Post('calculate')
  @ApiCreatedResponse({
    description: 'PaybackPlan successfully created.',
    type: PaybackPlan,
  })
  public calculatePaybackPlan(@Body() calculationData: CalculatePaybackPlanBody): Observable<PaybackPlan> {
    return this.apiPaybackService.calculatePaybackPlan(calculationData);
  }
}
