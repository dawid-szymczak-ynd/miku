import { UnprocessableEntityException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Repository } from 'typeorm';

import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

jest.mock('@nestjs/typeorm', () => ({
  InjectRepository: () => () => ({}),
}));

describe('SubcriptioMunerisUserService', () => {
  let service: SubcriptioMunerisUserService;
  const repositoryMock = {
    findOne: jest.fn(() => Promise.resolve({ id: 1 })),
    create: jest.fn(),
    save: jest.fn(() => Promise.resolve([{}])),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SubcriptioMunerisUserService,
        {
          provide: Repository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(SubcriptioMunerisUserService);
  });

  it('should have findOne() which returns found user', () => {
    expect(service.findOne({ id: 1 })).resolves.toEqual({ id: 1 });
  });

  it('should have findOne() which returns undefined if user is not found', () => {
    repositoryMock.findOne.mockImplementationOnce(() => Promise.resolve(undefined));

    expect(service.findOne({ id: 1 })).resolves.toEqual(undefined);
  });

  it('should have create() which returns user', () => {
    expect(service.create({ email: 'mockEmail', name: 'mockName', scoring: 12 })).resolves.toEqual({});
  });

  it('should have create() which throws error is user was not created', () => {
    repositoryMock.save.mockImplementationOnce(() => Promise.resolve([]));

    expect(service.create({ email: 'mockEmail', name: 'mockName', scoring: 12 })).rejects.toEqual(
      new UnprocessableEntityException([])
    );
  });
});
