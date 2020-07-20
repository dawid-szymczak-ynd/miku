import { Test } from '@nestjs/testing';

import { SubcriptioMunerisUserController } from './subcriptio-muneris-user.controller';
import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

describe('SubcriptioMunerisUserController', () => {
  const serviceMock = {
    create: jest.fn(() => Promise.resolve({ id: 2 })),
    findOne: jest.fn(() => Promise.resolve({ id: 1 })),
  };
  let controller: SubcriptioMunerisUserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: SubcriptioMunerisUserService,
          useValue: serviceMock,
        },
      ],
      controllers: [SubcriptioMunerisUserController],
    }).compile();

    controller = module.get(SubcriptioMunerisUserController);
  });

  it('should have findUser() which returns found user', async () => {
    const result = await controller.findUser({ value: { email: 'mockEmail' } });

    expect(result).toEqual({ id: 1 });
  });

  it('should have createUser() which creates user and returns user', async () => {
    const result = await controller.createUser({
      value: { userData: { email: 'mockEmail', name: 'mockName', scoring: 12 } },
    });

    expect(result).toEqual({ id: 2 });
  });

  it('should have createUser() which creates user and throws error if creating user was failed', async () => {
    serviceMock.create.mockImplementationOnce(() => Promise.reject(new Error()));

    try {
      await controller.createUser({
        value: { userData: { email: 'mockEmail', name: 'mockName', scoring: 12 } },
      });
    } catch (e) {
      expect(e).toEqual(new Error());
    }
  });
});
