import { PaybackPlanInterface } from '@miku-credit/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as PaybackActions from './payback.actions';

export const PAYBACK_FEATURE_KEY = 'payback';

export interface State extends EntityState<PaybackPlanInterface> {
  selectedId?: number;
  loaded: boolean;
  error?: Error;
}

export interface PaybackPartialState {
  readonly [PAYBACK_FEATURE_KEY]: State;
}

export const paybackAdapter: EntityAdapter<PaybackPlanInterface> = createEntityAdapter<PaybackPlanInterface>();

export const initialState: State = paybackAdapter.getInitialState({
  loaded: false,
});

const paybackReducer = createReducer(
  initialState,
  on(PaybackActions.calculatePaybackPlan, (state) => ({ ...state, loaded: false, error: null })),
  on(PaybackActions.calculatePaybackPlanSuccess, (state, { paybackPlan }) =>
    paybackAdapter.addOne(paybackPlan, { ...state, loaded: true, error: null })
  ),
  on(PaybackActions.calculatePaybackPlanFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action): State {
  return paybackReducer(state, action);
}
