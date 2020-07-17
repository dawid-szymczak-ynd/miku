import { ApiAuthModule } from '@miku-credit/api/auth';
import { ApiCommonModule } from '@miku-credit/api/common';
import { ApiLoanModule } from '@miku-credit/api/loan';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiCommonModule, ApiAuthModule, ApiLoanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
