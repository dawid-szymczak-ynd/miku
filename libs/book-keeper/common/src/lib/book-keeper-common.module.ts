import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthController } from './health/health.controller';

@Module({
  imports: [TerminusModule, TypeOrmModule.forFeature()],
  controllers: [HealthController],
  providers: [],
  exports: [],
})
export class BookKeeperCommonModule {}
