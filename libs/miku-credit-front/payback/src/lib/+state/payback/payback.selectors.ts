import { createFeatureSelector, createSelector } from '@ngrx/store';

import { paybackAdapter, PaybackPartialState, PAYBACK_FEATURE_KEY, State } from './payback.reducer';

export const getPaybackState = createFeatureSelector<PaybackPartialState, State>(PAYBACK_FEATURE_KEY);

const { selectAll, selectEntities } = paybackAdapter.getSelectors();

export const getPaybackLoaded = createSelector(getPaybackState, (state: State) => state.loaded);

export const getPaybackError = createSelector(getPaybackState, (state: State) => state.error);

export const getAllPayback = createSelector(getPaybackState, (state: State) => selectAll(state));

export const getPaybackEntities = createSelector(getPaybackState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getPaybackState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getPaybackEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
