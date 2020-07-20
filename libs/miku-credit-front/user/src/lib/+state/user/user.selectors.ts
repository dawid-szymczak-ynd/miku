import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, userAdapter, UserPartialState, USER_FEATURE_KEY } from './user.reducer';

export const getUserState = createFeatureSelector<UserPartialState, State>(USER_FEATURE_KEY);

const { selectEntities } = userAdapter.getSelectors();

export const getUserLoaded = createSelector(getUserState, (state: State) => state.loaded);

export const getUserError = createSelector(getUserState, (state: State) => state.error);

export const getUserEntities = createSelector(getUserState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getUserState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getUserEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
