import { LoanInterface } from '@miku-credit/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as LoanActions from './loan.actions';

export const LOAN_FEATURE_KEY = 'loan';

export interface State extends EntityState<LoanInterface> {
  selectedId?: number;
  loaded: boolean;
  error?: Error;
  currentPage: number;
}

export interface LoanPartialState {
  readonly [LOAN_FEATURE_KEY]: State;
}

export const loanAdapter: EntityAdapter<LoanInterface> = createEntityAdapter<LoanInterface>();

export const initialState: State = loanAdapter.getInitialState({
  currentPage: -1,
  loaded: false,
});

const loanReducer = createReducer(
  initialState,
  on(LoanActions.loadLoansPage, (state, { page }) => ({ ...state, loaded: false, error: null, currentPage: page })),
  on(LoanActions.loadLoansPageSuccess, (state, { loans }) => loanAdapter.setAll(loans, { ...state, loaded: true })),
  on(LoanActions.loadLoansPageFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action): State {
  return loanReducer(state, action);
}
