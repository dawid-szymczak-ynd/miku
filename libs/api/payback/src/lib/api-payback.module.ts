import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ApiPaybackController } from './api-payback.controller';
import { ApiPaybackService } from './api-payback.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CALCULATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway',
            brokers: [process.env.KAFKA_URL],
          },
          consumer: {
            groupId: 'loan-calculation',
          },
        },
      },
    ]),
  ],
  controllers: [ApiPaybackController],
  providers: [ApiPaybackService],
  exports: [ApiPaybackService],
})
export class ApiPaybackModule {}
