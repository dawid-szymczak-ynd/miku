import { User } from '@miku-credit/api-interfaces';
import { Test } from '@nestjs/testing';

import { of } from 'rxjs';

import { GoogleSerializer } from './google.serializer';

describe('GoogleSerializer', () => {
  const clientKafkaMock = {
    send: jest.fn().mockImplementationOnce(() => of({ id: 'userExist' })),
  };
  let serializer: GoogleSerializer;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GoogleSerializer,
        {
          provide: 'USER_SERVICE',
          useValue: clientKafkaMock,
        },
      ],
    }).compile();

    serializer = module.get(GoogleSerializer);
  });

  it('should have serializeUser() which call callback with user email', () => {
    const mockCb = jest.fn();

    serializer.serializeUser(({ email: 'mockEmail' } as unknown) as User, mockCb);

    expect(mockCb).toBeCalledWith(null, 'mockEmail');
  });

  it('should have serializeUser() which call callback with user email', async () => {
    const mockCb = jest.fn();

    await serializer.deserializeUser('mockEmail', mockCb);

    expect(mockCb).toBeCalledWith(null, { id: 'userExist' });
  });
});
