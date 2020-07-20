import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from '@nrwl/angular/testing';

import { throwError } from 'rxjs';

import { UserFacade } from '../+state/user/user.facade';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: Router, useValue: { navigate: jest.fn(() => Promise.resolve({})) } },
        { provide: UserFacade, useValue: { clearUser: jest.fn() } },
      ],
    })
  );

  it('should have intercept() which handle unauthorized errors and logout user', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    const { navigate }: Router = TestBed.inject(Router);
    const { clearUser }: UserFacade = TestBed.inject(UserFacade);
    const result$ = interceptor.intercept({} as HttpRequest<unknown>, {
      handle: jest.fn(() => throwError(new HttpErrorResponse({ status: 403 }))),
    });
    const expected$ = cold('#', null, new HttpErrorResponse({ status: 403 }));

    expect(result$).toBeObservable(expected$);
    expect(navigate).toBeCalledWith(['/sell-soul/login']);
    expect(clearUser).toBeCalled();
  });

  it('should have intercept() which jus pass error further if code is different than 401', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    const { navigate }: Router = TestBed.inject(Router);
    const { clearUser }: UserFacade = TestBed.inject(UserFacade);
    const result$ = interceptor.intercept({} as HttpRequest<unknown>, {
      handle: jest.fn(() => throwError(new HttpErrorResponse({ status: 500 }))),
    });
    const expected$ = cold('#', null, new HttpErrorResponse({ status: 500 }));

    expect(result$).toBeObservable(expected$);
    expect(navigate).not.toBeCalledWith(['/sell-soul/login']);
    expect(clearUser).not.toBeCalled();
  });
});
