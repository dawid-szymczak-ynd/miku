import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@miku-credit/miku-credit-front/homepage').then(
        (module) => module.MikuCreditFrontHomepageModule
      ),
  },
];
