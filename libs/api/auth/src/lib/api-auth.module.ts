import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

import { ApiAuthController } from './api-auth.controller';
import { ApiAuthService } from './api-auth.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway',
            brokers: ['kafka.persitance:9092'],
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
  providers: [ApiAuthService, GoogleStrategy],
  exports: [],
})
export class ApiAuthModule {}
