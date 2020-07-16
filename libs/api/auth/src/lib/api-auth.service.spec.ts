import { Test } from '@nestjs/testing';
import { cold } from '@nrwl/angular/testing';

import { Profile } from 'passport';
import { of } from 'rxjs';

import { ApiAuthService } from './api-auth.service';

describe('ApiAuthService', () => {
  const clientKafkaMock = {
    send: jest.fn().mockImplementationOnce(() => of({ id: 'userExist' })),
  };
  let service: ApiAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ApiAuthService,
        {
          provide: 'USER_SERVICE',
          useValue: clientKafkaMock,
        },
      ],
    }).compile();

    service = module.get(ApiAuthService);
  });

  it('should have authorizeUser which return user when they exists', () => {
    const { send } = clientKafkaMock;
    const result$ = service.authorizeUser({
      name: { givenName: 'mockName' },
      emails: [{ value: 'mockEmail' }],
    } as Profile);
    const expected$ = cold('(a|)', {
      a: { id: 'userExist' },
    });

    expect(result$).toBeObservable(expected$);
    expect(send).toBeCalledWith('user.findByEmail', { email: 'mockEmail' });
  });

  it('should have authorizeUser which create user when they doesnt exist', () => {
    const { send } = clientKafkaMock;

    (send as jest.Mock).mockClear();
    (send as jest.Mock).mockImplementationOnce(() => of(undefined)).mockImplementationOnce(() => of({ id: 'created' }));

    const result$ = service.authorizeUser({
      name: { givenName: 'mockName' },
      emails: [{ value: 'mockEmail' }],
    } as Profile);
    const expected$ = cold('(a|)', {
      a: { id: 'created' },
    });

    expect(result$).toBeObservable(expected$);
    expect(send).toBeCalledWith('user.findByEmail', { email: 'mockEmail' });
    expect(send).toBeCalledWith('user.create', {
      userData: {
        email: 'mockEmail',
        name: 'mockName',
        scoring: 100,
      },
    });
  });
});
