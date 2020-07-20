import { ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { GoogleAuthenticatedGuard } from './google-authenticated.guard';

describe('GoogleAuthenticatedGuard', () => {
  let guard: GoogleAuthenticatedGuard;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GoogleAuthenticatedGuard],
    }).compile();

    guard = module.get(GoogleAuthenticatedGuard);
  });

  it('should have canActivate() which return true when user object is in request', async () => {
    const result = await guard.canActivate(({
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({ user: {} })),
      })),
    } as unknown) as ExecutionContext);

    expect(result).toBe(true);
  });
});
