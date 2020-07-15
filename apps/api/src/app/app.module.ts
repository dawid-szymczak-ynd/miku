import { ApiCommonModule } from '@miku-credit/api/common';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, ApiCommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
