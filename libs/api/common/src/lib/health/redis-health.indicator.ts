import { Inject, Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

import { RedisClient } from 'redis';
import { promisify } from 'util';

import { REDIS_CLIENT } from '../tokens';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  public asyncPing: () => Promise<boolean> = promisify(this.redisClient['ping']).bind(this.redisClient);

  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: RedisClient) {
    super();
  }

  public async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.asyncPing();

      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError('Redis check failed', this.getStatus(key, false));
    }
  }
}
