import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('/rediness')
  @HealthCheck()
  public readiness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () =>
        Promise.resolve({
          default: {
            status: 'up',
          },
        }),
    ]);
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
