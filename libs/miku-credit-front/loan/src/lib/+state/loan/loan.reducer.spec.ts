import { LoanInterface } from '@miku-credit/api-interfaces';

import * as LoanActions from './loan.actions';
import { initialState, reducer, State } from './loan.reducer';

describe('Loan Reducer', () => {
  describe('valid Loan actions', () => {
    it('loadLoansPage should set default state and currentPage', () => {
      const action = LoanActions.loadLoansPage({ page: 0 });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
      expect(result.currentPage).toBe(0);
    });

    it('loadLoansPageSuccess should set loans', () => {
      const action = LoanActions.loadLoansPageSuccess({
        loans: [{ id: 1 } as LoanInterface, { id: 2 } as LoanInterface],
      });
      const result: State = reducer(initialState, action);
      const numberOfLoans = 2;

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(numberOfLoans);
    });

    it('loadLoansPageFailure should set error', () => {
      const action = LoanActions.loadLoansPageFailure({ error: new Error() });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toEqual(new Error());
    });
  });
});
