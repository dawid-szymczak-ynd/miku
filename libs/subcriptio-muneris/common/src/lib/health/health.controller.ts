import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator
  ) {}

  @Get('/rediness')
  @HealthCheck()
  public readiness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () =>
        this.typeOrmHealthIndicator.pingCheck('postgresql', {
          timeout: 300,
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
