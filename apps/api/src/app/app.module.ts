import { ApiAuthModule } from '@miku-credit/api/auth';
import { ApiCommonModule } from '@miku-credit/api/common';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiCommonModule, ApiAuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
