import { UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Profile } from 'passport-google-oauth';
import { of, throwError } from 'rxjs';

import { ApiAuthService } from './api-auth.service';
import { GoogleStrategy } from './google.strategy';

jest.mock('passport-google-oauth');

describe('GoogleStrategy', () => {
  const serviceMock = {
    authorizeUser: jest.fn().mockImplementationOnce(() => of({ id: 1 })),
  };
  let strategy: GoogleStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GoogleStrategy,
        {
          provide: ApiAuthService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    strategy = module.get(GoogleStrategy);
  });

  it('should have validate which returns user when authorization will be successful', async () => {
    const { authorizeUser } = serviceMock;

    const result = await strategy.validate('mockToken', 'mockToken', {
      displayName: 'mockName',
      emails: [{ value: 'mockEmail' }],
    } as Profile);

    expect(result).toEqual({ id: 1 });
    expect(authorizeUser).toBeCalledWith('mockEmail', 'mockName');
  });

  it('should have validate which throws error when authorization will be failure', async () => {
    const { authorizeUser } = serviceMock;

    (authorizeUser as jest.Mock).mockClear();
    (authorizeUser as jest.Mock).mockImplementationOnce(() => throwError(new Error('Connection error')));

    try {
      await strategy.validate('mockToken', 'mockToken', {
        displayName: 'mockName',
        emails: [{ value: 'mockEmail' }],
      } as Profile);
    } catch (e) {
      expect(e).toEqual(new UnauthorizedException(new Error('Connection error')));
      expect(authorizeUser).toBeCalledWith('mockEmail', 'mockName');
    }
  });

  it('should have validate which throws error when user will be empty', async () => {
    const { authorizeUser } = serviceMock;

    (authorizeUser as jest.Mock).mockClear();
    (authorizeUser as jest.Mock).mockImplementationOnce(() => of(undefined));

    try {
      await strategy.validate('mockToken', 'mockToken', {
        displayName: 'mockName',
        emails: [{ value: 'mockEmail' }],
      } as Profile);
    } catch (e) {
      expect(e).toEqual(new UnauthorizedException());
      expect(authorizeUser).toBeCalledWith('mockEmail', 'mockName');
    }
  });
});
