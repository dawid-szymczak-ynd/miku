import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserFacade } from '../+state/user/user.facade';

const RESPONSE_UNAUTHORIZED_CODE = 401;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router, private readonly userFacade: UserFacade) {}

  public intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.status === RESPONSE_UNAUTHORIZED_CODE) {
          this.userFacade.clearUser(httpErrorResponse);
          this.router.navigate(['/sell-soul/login']);
        }

        return throwError(httpErrorResponse);
      })
    );
  }
}
