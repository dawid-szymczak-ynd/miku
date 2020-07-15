import { Test } from '@nestjs/testing';

import { SubcriptioMunerisUserController } from './subcriptio-muneris-user.controller';
import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

describe('SubcriptioMunerisUserController', () => {
  let controller: SubcriptioMunerisUserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: SubcriptioMunerisUserService,
          useValue: {
            create: jest.fn(() => Promise.resolve({ raw: { id: 2 } })),
            findOne: jest.fn(() => Promise.resolve({ id: 1 })),
          },
        },
      ],
      controllers: [SubcriptioMunerisUserController],
    }).compile();

    controller = module.get(SubcriptioMunerisUserController);
  });

  it('should have findUser() which returns found user', async () => {
    const result = await controller.findUser({ id: 1 });

    expect(result).toEqual({ id: 1 });
  });

  it('should have createUser() which creates user and returns insert result', async () => {
    const result = await controller.createUser({ userData: { email: 'mockEmail', name: 'mockName', scoring: 12 } });

    expect(result).toEqual({ id: 2 });
  });
});
