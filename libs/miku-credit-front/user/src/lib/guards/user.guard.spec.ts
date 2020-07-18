import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserFacade } from '@miku-credit/miku-credit-front/user';
import { cold } from '@nrwl/angular/testing';

import { from, of } from 'rxjs';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  let guard: UserGuard;
  let userFacade: UserFacade;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserGuard,
        {
          provide: UserFacade,
          useValue: {
            loaded$: from([false, true]),
            loadUser: jest.fn(),
            isLoggedIn$: of(true),
          },
        },
        {
          provide: Router,
          useValue: {
            createUrlTree: jest.fn((params) => params),
          },
        },
      ],
    });

    guard = TestBed.inject(UserGuard);
    userFacade = TestBed.inject(UserFacade);
    router = TestBed.inject(Router);
  });

  it('should have canActivate() with call loadUser when user state is not logged in', () => {
    const result$ = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    const expected$ = cold('(a|)', { a: true });
    const { loadUser } = userFacade;

    expect(result$).toBeObservable(expected$);
    expect(loadUser).toBeCalled();
  });

  it('should have canActivate() with call loadUser when user state is not logged in and redirect to /sell-soul/login if fetching user failed', () => {
    const { loadUser } = userFacade;

    userFacade.loaded$ = from([false, true]);
    userFacade.isLoggedIn$ = of(false);

    const result$ = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    const expected$ = cold('(a|)', { a: ['/sell-soul/login'] });

    expect(result$).toBeObservable(expected$);
    expect(loadUser).toBeCalled();
  });
});
