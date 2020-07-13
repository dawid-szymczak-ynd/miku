import { Controller, Get } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthCheck,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private dns: DNSHealthIndicator) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthIndicatorResult> {
    return Promise.resolve({});
  }
}
