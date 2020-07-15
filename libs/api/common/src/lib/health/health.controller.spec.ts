import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from './health.controller';

describe('Health Controller', () => {
  let controller: HealthController;
  let healthCheckService: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: { check: jest.fn((arrayOfCb) => Promise.all(arrayOfCb.map((cb) => cb()))) },
        },
        { provide: TypeOrmHealthIndicator, useValue: { pingCheck: jest.fn(() => Promise.resolve({})) } },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should have liveness() which call HealthCheckService.check() with default indicator', () => {
    const { check } = healthCheckService;

    expect(controller.liveness()).resolves.toEqual([
      {
        default: {
          status: 'up',
        },
      },
    ]);
    expect(check).toBeCalledWith([expect.any(Function)]);
  });

  it('should have readiness() which call HealthCheckService.check() with TypeOrmHealthIndicator', () => {
    const { check } = healthCheckService;

    (check as jest.Mock).mockClear();

    expect(controller.readiness()).resolves.toEqual([
      {
        default: {
          status: 'up',
        },
      },
    ]);
    expect(check).toBeCalledWith([expect.any(Function)]);
  });
});
