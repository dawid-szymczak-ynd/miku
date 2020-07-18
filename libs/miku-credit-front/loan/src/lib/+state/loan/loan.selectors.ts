import { createFeatureSelector, createSelector } from '@ngrx/store';

import { loanAdapter, LoanPartialState, LOAN_FEATURE_KEY, State } from './loan.reducer';

export const getLoanState = createFeatureSelector<LoanPartialState, State>(LOAN_FEATURE_KEY);

const { selectAll, selectEntities } = loanAdapter.getSelectors();

export const getLoanLoaded = createSelector(getLoanState, (state: State) => state.loaded);

export const getLoanError = createSelector(getLoanState, (state: State) => state.error);

export const getCurrentPage = createSelector(getLoanState, (state: State) => state.currentPage);

export const getAllLoans = createSelector(getLoanState, (state: State) => selectAll(state));

export const getLoansEntities = createSelector(getLoanState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getLoanState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getLoansEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
