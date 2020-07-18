import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Observable, of } from 'rxjs';

import { LoanService } from '../../services/loan.service';
import * as LoanActions from './loan.actions';
import { LoanEffects } from './loan.effects';

describe('LoanEffects', () => {
  let actions: Observable<Action>;
  let effects: LoanEffects;
  let loanService: LoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LoanEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: LoanService, useValue: { getLoansPage: jest.fn(() => of([])) } },
      ],
    });

    effects = TestBed.inject(LoanEffects);
    loanService = TestBed.inject(LoanService);
  });

  describe('loadLoan$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LoanActions.loadLoansPage({ page: 0 }) });

      const expected = hot('-a-|', { a: LoanActions.loadLoansPageSuccess({ loans: [] }) });
      const { getLoansPage } = loanService;

      expect(effects.loadLoan$).toBeObservable(expected);
      expect(getLoansPage).toBeCalledWith(0);
    });
  });
});
