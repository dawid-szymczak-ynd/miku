import { Test } from '@nestjs/testing';
import { cold } from '@nrwl/angular/testing';

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

  it('should have validate which call verifyFunction when authorization will be successful', () => {
    const { authorizeUser } = serviceMock;
    const mockDone = jest.fn();

    const result$ = strategy.validate(
      'mockToken',
      'mockToken',
      {
        name: { givenName: 'mockName' },
        emails: [{ value: 'mockEmail' }],
      } as Profile,
      mockDone
    );
    const expected$ = cold('(a|)', {
      a: undefined,
    });

    expect(result$).toBeObservable(expected$);
    expect(authorizeUser).toBeCalledWith({
      name: { givenName: 'mockName' },
      emails: [{ value: 'mockEmail' }],
    });
    expect(mockDone).toBeCalledWith(null, { id: 1, accessToken: 'mockToken' });
  });

  it('should have validate which call verifyFunction with error when authorization will be failure', () => {
    const { authorizeUser } = serviceMock;
    const mockDone = jest.fn();

    (authorizeUser as jest.Mock).mockClear();
    (authorizeUser as jest.Mock).mockImplementationOnce(() => throwError(new Error('Connection error')));

    const result$ = strategy.validate(
      'mockToken',
      'mockToken',
      {
        name: { givenName: 'mockName' },
        emails: [{ value: 'mockEmail' }],
      } as Profile,
      mockDone
    );
    const expected$ = cold('#', null, new Error('Connection error'));

    expect(result$).toBeObservable(expected$);
    expect(authorizeUser).toBeCalledWith({
      name: { givenName: 'mockName' },
      emails: [{ value: 'mockEmail' }],
    });
    expect(mockDone).toBeCalledWith(new Error('Connection error'), { email: 'mockEmail' });
  });
});
