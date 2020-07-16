import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

import { RedisHealthIndicator } from './redis-health.indicator';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly redisHealthIndicator: RedisHealthIndicator
  ) {}

  @Get('/rediness')
  @HealthCheck()
  public readiness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([() => this.redisHealthIndicator.isHealthy('redis')]);
  }

  @Get('/liveness')
  @HealthCheck()
  public liveness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () =>
        Promise.resolve({
          default: {
            status: 'up',
          },
        }),
    ]);
  }
}
