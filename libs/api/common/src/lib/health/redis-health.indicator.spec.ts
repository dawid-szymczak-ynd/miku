import { Test, TestingModule } from '@nestjs/testing';

import { REDIS_CLIENT } from '../tokens';
import { RedisHealthIndicator } from './redis-health.indicator';

describe('RedisHealth Indicator', () => {
  const redisClientMock = {
    ping: jest.fn().mockImplementationOnce((cb) => cb(null, true)),
  };
  let indicator: RedisHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedisHealthIndicator],
      providers: [
        {
          provide: REDIS_CLIENT,
          useValue: redisClientMock,
        },
      ],
    }).compile();

    indicator = module.get<RedisHealthIndicator>(RedisHealthIndicator);
  });

  it('should have isHealthy() which return HealthIndicatorResult', async () => {
    const { ping } = redisClientMock;
    const result = await indicator.isHealthy('redis');

    expect(result).toEqual({
      redis: {
        status: 'up',
      },
    });
    expect(ping).toBeCalled();
  });

  it('should have isHealthy() which return error when redis is not responding ', () => {
    const { ping } = redisClientMock;

    (ping as jest.Mock).mockImplementationOnce((cb) => cb(new Error(), false));

    expect(indicator.isHealthy('redis')).rejects.toEqual({});
    expect(ping).toBeCalled();
  });
});
