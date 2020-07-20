import { LoanInterface } from '@miku-credit/api-interfaces';

import { initialState, loanAdapter } from './loan.reducer';
import * as LoanSelectors from './loan.selectors';

describe('Loan Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      loan: loanAdapter.setAll([{ id: 1 } as LoanInterface, { id: 2 } as LoanInterface], {
        ...initialState,
        selectedId: 1,
        error: null,
        loaded: true,
        currentPage: 0,
      }),
    };
  });

  describe('Loan Selectors', () => {
    it('getAllLoan() should return the list of Loan', () => {
      const results = LoanSelectors.getAllLoans(state);
      const numberOfLoans = 2;

      expect(results.length).toBe(numberOfLoans);
    });

    it('getSelected() should return the selected Entity', () => {
      const result = LoanSelectors.getSelected(state);

      expect(result.id).toBe(1);
    });

    it("getLoanLoaded() should return the current 'loaded' status", () => {
      const result = LoanSelectors.getLoanLoaded(state);

      expect(result).toBe(true);
    });

    it("getLoanError() should return the current 'error' state", () => {
      const result = LoanSelectors.getLoanError(state);

      expect(result).toBe(null);
    });

    it('getCurrentPage() should return the current page index', () => {
      const result = LoanSelectors.getCurrentPage(state);

      expect(result).toBe(0);
    });
  });
});
