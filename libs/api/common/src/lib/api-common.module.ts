import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import * as Redis from 'redis';

import { HealthController } from './health/health.controller';
import { RedisHealthIndicator } from './health/redis-health.indicator';
import { REDIS_CLIENT } from './tokens';

@Global()
@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    {
      provide: REDIS_CLIENT,
      useValue: Redis.createClient({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      }),
    },
    RedisHealthIndicator,
  ],
  exports: [REDIS_CLIENT],
})
export class ApiCommonModule {}
