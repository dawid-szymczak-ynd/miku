import { Injectable } from '@angular/core';
import { LoanInterface } from '@miku-credit/api-interfaces';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { loadLoansPage } from './loan.actions';
import * as fromLoan from './loan.reducer';
import * as LoanSelectors from './loan.selectors';

@Injectable()
export class LoanFacade {
  public loaded$: Observable<boolean> = this.store.pipe(select(LoanSelectors.getLoanLoaded));
  public allLoans$: Observable<LoanInterface[]> = this.store.pipe(select(LoanSelectors.getAllLoans));
  public selectedLoan$: Observable<LoanInterface> = this.store.pipe(select(LoanSelectors.getSelected));
  public currentPage$: Observable<number> = this.store.pipe(select(LoanSelectors.getCurrentPage));

  constructor(private readonly store: Store<fromLoan.LoanPartialState>) {}

  public loadLoansPage(page: number): void {
    this.store.dispatch(loadLoansPage({ page }));
  }
}
