import { ClientKafka } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';

import { Request } from 'express';

import { ApiAuthController } from './api-auth.controller';
import { ApiAuthService } from './api-auth.service';

describe('ApiAuthController', () => {
  let controller: ApiAuthController;
  let clientKafka: ClientKafka;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ApiAuthService,
        {
          provide: 'USER_SERVICE',
          useValue: {
            subscribeToResponseOf: jest.fn(),
          },
        },
      ],
      controllers: [ApiAuthController],
    }).compile();

    controller = module.get(ApiAuthController);
    clientKafka = module.get('USER_SERVICE');
  });

  it('should be defined', () => {
    const { subscribeToResponseOf } = clientKafka;
    const subscribeCount = 2;

    controller.onModuleInit();

    expect(controller).toBeTruthy();
    expect(subscribeToResponseOf).toBeCalledTimes(subscribeCount);
  });

  it('should have googleAuth which do nothing', async () => {
    const result = await controller.googleAuth();

    expect(result).toEqual(undefined);
  });

  it('should have googleAuthRedirect which return user data', () => {
    const result = controller.googleAuthRedirect(({ user: { id: 2 } } as unknown) as Request);

    expect(result).toEqual({ id: 2 });
  });
});
