import { RouterReducerState } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';

import { SellSoulPartialState } from './sell-soul.reducer';

export const getRouterState = (state: SellSoulPartialState) => state.router;

export const getActiveStepIndex = createSelector(getRouterState, ({ state }: RouterReducerState) =>
  String(state.root.firstChild.firstChild.params.status)
);
