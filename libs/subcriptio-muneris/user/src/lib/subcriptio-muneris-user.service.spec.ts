import { Test } from '@nestjs/testing';

import { Repository } from 'typeorm';

import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

jest.mock('@nestjs/typeorm', () => ({
  InjectRepository: () => () => ({}),
}));

describe('SubcriptioMunerisUserService', () => {
  let service: SubcriptioMunerisUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SubcriptioMunerisUserService,
        {
          provide: Repository,
          useValue: {
            findOne: jest.fn(() => Promise.resolve({ id: 1 })),
            create: jest.fn(),
            insert: jest.fn(() => Promise.resolve({})),
          },
        },
      ],
    }).compile();

    service = module.get(SubcriptioMunerisUserService);
  });

  it('should have findOne() which returns found user', () => {
    expect(service.findOne({ id: 1 })).resolves.toEqual({ id: 1 });
  });

  it('should have create() which returns insert result', () => {
    expect(service.create({ email: 'mockEmail', name: 'mockName', scoring: 12 })).resolves.toEqual({});
  });
});
