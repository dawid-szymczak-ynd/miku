import { CalculatePaybackPlanBody, PaybackPlanInterface } from '@miku-credit/api-interfaces';

import * as PaybackActions from './payback.actions';
import { initialState, reducer, State } from './payback.reducer';

describe('Payback Reducer', () => {
  describe('valid Payback actions', () => {
    it('calculatePaybackPlan should set default state', () => {
      const action = PaybackActions.calculatePaybackPlan({ calculatePaybackPlanBody: {} as CalculatePaybackPlanBody });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });

    it('calculatePaybackPlanSuccess should add one paybackPlan to repository', () => {
      const action = PaybackActions.calculatePaybackPlanSuccess({ paybackPlan: { id: 1 } as PaybackPlanInterface });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.error).toBe(null);
      expect(result.ids.length).toBe(1);
    });

    it('calculatePaybackPlan should set error', () => {
      const action = PaybackActions.calculatePaybackPlanFailure({ error: new Error() });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toEqual(new Error());
    });
  });
});
