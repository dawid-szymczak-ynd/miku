import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { cold } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { LoanService } from './loan.service';

describe('LoanService', () => {
  let service: LoanService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoanService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(() => of({})),
          },
        },
      ],
    });

    service = TestBed.inject(LoanService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should have getLoansPage() which return loans', () => {
    const { get } = httpClient;
    const result$ = service.getLoansPage(1);
    const expected$ = cold('(a|)', { a: {} });

    expect(result$).toBeObservable(expected$);
    expect(get).toBeCalledWith('/api/loan?page=1', { withCredentials: true });
  });
});
