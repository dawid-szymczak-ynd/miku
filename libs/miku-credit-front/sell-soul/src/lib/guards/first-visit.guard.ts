import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

@Injectable()
export class FirstVisitGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot): UrlTree | boolean {
    const firstStepStatus = 'first-step';

    if (next.params.status !== firstStepStatus && !this.router.navigated) {
      return this.router.createUrlTree([`/sell-soul`, 'flow', firstStepStatus], {
        queryParams: next.queryParams,
      });
    }

    return true;
  }
}
