import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@miku-credit/miku-credit-front/homepage').then((module) => module.MikuCreditFrontHomepageModule),
  },
  {
    path: 'sell-soul',
    loadChildren: () =>
      import('@miku-credit/miku-credit-front/sell-soul').then((module) => module.MikuCreditFrontSellSoulModule),
  },
];
