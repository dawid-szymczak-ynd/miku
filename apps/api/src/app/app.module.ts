import { ApiAuthController } from '@miku-credit/api/auth';
import { ApiCommonModule } from '@miku-credit/api/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ApiCommonModule,
    ApiAuthController,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
