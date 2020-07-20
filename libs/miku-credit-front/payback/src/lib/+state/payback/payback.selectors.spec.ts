import { PaybackPlanInterface } from '@miku-credit/api-interfaces';

import { initialState, paybackAdapter } from './payback.reducer';
import * as PaybackSelectors from './payback.selectors';

describe('Payback Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      payback: paybackAdapter.setAll([{ id: 1 } as PaybackPlanInterface], {
        ...initialState,
        selectedId: 1,
        error: null,
        loaded: true,
      }),
    };
  });

  describe('Payback Selectors', () => {
    it('getAllPayback() should return the list of Payback', () => {
      const results = PaybackSelectors.getAllPayback(state);

      expect(results.length).toBe(1);
    });

    it('getSelected() should return the selected Entity', () => {
      const result = PaybackSelectors.getSelected(state);

      expect(result.id).toBe(1);
    });

    it("getPaybackLoaded() should return the current 'loaded' status", () => {
      const result = PaybackSelectors.getPaybackLoaded(state);

      expect(result).toBe(true);
    });

    it("getPaybackError() should return the current 'error' state", () => {
      const result = PaybackSelectors.getPaybackError(state);

      expect(result).toBe(null);
    });
  });
});
