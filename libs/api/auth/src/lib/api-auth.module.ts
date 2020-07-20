import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

import { ApiAuthController } from './api-auth.controller';
import { ApiAuthService } from './api-auth.service';
import { GoogleAuthLoginGuard } from './google-auth-login.guard';
import { GoogleAuthenticatedGuard } from './google-authenticated.guard';
import { GoogleSerializer } from './google.serializer';
import { GoogleStrategy } from './google.strategy';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway',
            brokers: [process.env.KAFKA_URL],
          },
          consumer: {
            groupId: 'user-operations',
          },
        },
      },
    ]),
    PassportModule.register({ session: true, defaultStrategy: 'google' }),
  ],
  controllers: [ApiAuthController],
  providers: [ApiAuthService, GoogleStrategy, GoogleSerializer, GoogleAuthLoginGuard, GoogleAuthenticatedGuard],
  exports: [GoogleAuthLoginGuard, GoogleAuthenticatedGuard],
})
export class ApiAuthModule {}
