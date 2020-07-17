import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ApiLoanController } from './api-loan.controller';
import { ApiLoanService } from './api-loan.service';

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
  controllers: [ApiLoanController],
  providers: [ApiLoanService],
  exports: [ApiLoanService],
})
export class ApiLoanModule {}
