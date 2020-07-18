import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CalculatePaybackPlanBody } from '@miku-credit/api-interfaces';
import { cold } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { PaybackService } from './payback.service';

describe('PaybackService', () => {
  let service: PaybackService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaybackService,
        {
          provide: HttpClient,
          useValue: {
            post: jest.fn(() => of({})),
          },
        },
      ],
    });

    service = TestBed.inject(PaybackService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should have calculatePaybackPlan() which return paybackPlan', () => {
    const { post } = httpClient;
    const result$ = service.calculatePaybackPlan({} as CalculatePaybackPlanBody);
    const expected$ = cold('(a|)', { a: {} });

    expect(result$).toBeObservable(expected$);
    expect(post).toBeCalledWith('/api/payback/calculate', {}, { withCredentials: true });
  });
});
