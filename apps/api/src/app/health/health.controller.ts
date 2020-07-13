import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthIndicatorResult } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor() {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthIndicatorResult> {
    return Promise.resolve({});
  }
}
