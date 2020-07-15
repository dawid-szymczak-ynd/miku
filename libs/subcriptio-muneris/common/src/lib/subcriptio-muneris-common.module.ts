import { Module } from '@nestjs/common';

import { HealthController } from './health/health.controller';

@Module({
  controllers: [HealthController],
  providers: [],
  exports: [],
})
export class SubcriptioMunerisCommonModule {}
