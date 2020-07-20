import { ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { GoogleAuthLoginGuard } from './google-auth-login.guard';

jest.mock('@nestjs/passport', () => ({
  AuthGuard: () =>
    class {
      public async canActivate(context: unknown): Promise<boolean> {
        return context['active'];
      }
      public async logIn(request: unknown): Promise<boolean> {
        return request['active'];
      }
    },
}));

describe('GoogleAuthLoginGuard', () => {
  let guard: GoogleAuthLoginGuard;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GoogleAuthLoginGuard],
    }).compile();

    guard = module.get(GoogleAuthLoginGuard);
  });

  it('should have canActivate() which returns true if parent class say so', async () => {
    const result = await guard.canActivate(({
      active: true,
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({})),
      })),
    } as unknown) as ExecutionContext);

    expect(result).toBe(true);
  });

  it('should have canActivate() which returns false if parent class say so', async () => {
    const result = await guard.canActivate(({
      active: false,
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({})),
      })),
    } as unknown) as ExecutionContext);

    expect(result).toBe(false);
  });
});
