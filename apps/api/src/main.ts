import { REDIS_CLIENT } from '@miku-credit/api/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as ConnectRedis from 'connect-redis';
import * as ExpressSession from 'express-session';
import * as Passport from 'passport';

import { AppModule } from './app/app.module';

const DEFAULT_PORT = 80;
const COOKIE_MAX_AGE = 1800000;
const OPTIONS = new DocumentBuilder()
  .setTitle('Api Gateway')
  .setDescription('Api Gateway application public interface')
  .setVersion('1.0')
  .addTag('apiGateway')
  .build();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || DEFAULT_PORT;
  const redisClient = app.get(REDIS_CLIENT);
  const document = SwaggerModule.createDocument(app, OPTIONS);

  app.use(
    ExpressSession({
      store: new (ConnectRedis(ExpressSession))({
        client: redisClient,
      }),
      secret: process.env.SESSION_SECRET,
      rolling: true,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
      },
    })
  );
  app.use(Passport.initialize());
  app.use(Passport.session());
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap().then(() => Logger.log('Bootstrap done!'));
