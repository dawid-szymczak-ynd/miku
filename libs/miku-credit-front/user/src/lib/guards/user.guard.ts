import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { UserFacade } from '../+state/user/user.facade';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userFacade: UserFacade, private readonly router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.userFacade.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.userFacade.loadUser();
        }
      }),
      filter((loaded) => loaded),
      switchMap(() => this.userFacade.isLoggedIn$),
      map((isLoggedIn) => (isLoggedIn ? true : this.router.createUrlTree(['/sell-soul/login'])))
    );
  }
}
