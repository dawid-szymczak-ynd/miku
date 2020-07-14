import { NgModuleFactory } from '@angular/core';
import { LoadChildrenCallback, Route } from '@angular/router';

import { routes } from './main.routes';

jest.mock('@miku-credit/miku-credit-front/homepage');
jest.mock('@miku-credit/miku-credit-front/sell-soul');

describe('Routes', () => {
  it('should have 2 route', () => {
    const routeLength = 2;
    const allRoutes = [...routes];

    expect(allRoutes).toHaveLength(routeLength);
  });

  it('lazy loaded modules should call loadChildren method', () => {
    const moduleArray = [];
    const lazyLoadedModuleLength = 2;
    const allRoutes = [...routes];

    allRoutes.forEach(({ loadChildren }: Route) => {
      if (loadChildren) {
        const modulePromise = (<LoadChildrenCallback>loadChildren)() as Promise<NgModuleFactory<unknown>>;

        moduleArray.push(modulePromise);
      }
    });

    expect(Promise.all(moduleArray)).resolves.toHaveLength(lazyLoadedModuleLength);
  });
});
