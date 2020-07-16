import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

const DEFAULT_PORT = 80;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || DEFAULT_PORT;

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'subcriptio-muneris',
        brokers: [process.env.KAFKA_URL],
      },
      consumer: {
        groupId: 'user-operations',
      },
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap().then(() => Logger.log('Bootstrap done!'));
