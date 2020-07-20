import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { FirstVisitGuard } from './first-visit.guard';

describe('FirstVisitGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirstVisitGuard,
        {
          provide: Router,
          useValue: {
            createUrlTree: jest.fn(() => 'mockURLTree'),
            navigated: false,
          },
        },
      ],
    });
  });

  it('should be defined', inject([FirstVisitGuard], (guard: FirstVisitGuard) => {
    expect(guard).toBeDefined();
  }));

  it('canActivate() should redirect user when navigated is false and step index is not set on first', inject(
    [FirstVisitGuard],
    (guard: FirstVisitGuard) => {
      expect(
        guard.canActivate(({
          params: { status: 'wrong-status' },
        } as unknown) as ActivatedRouteSnapshot)
      ).toBe('mockURLTree');
    }
  ));

  it('canActivate() should return true when navigated is false but step index is set on first', inject(
    [FirstVisitGuard],
    (guard: FirstVisitGuard) => {
      expect(
        guard.canActivate(({
          params: { status: 'first-step' },
        } as unknown) as ActivatedRouteSnapshot)
      ).toBe(true);
    }
  ));
});
