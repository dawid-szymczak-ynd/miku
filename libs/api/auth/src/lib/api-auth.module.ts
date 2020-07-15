import { Module } from '@nestjs/common';

import { ApiAuthController } from './api-auth.controller';
import { ApiAuthService } from './api-auth.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  controllers: [ApiAuthController],
  providers: [ApiAuthService, GoogleStrategy],
  exports: [],
})
export class ApiAuthModule {}
