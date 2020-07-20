import { RouterReducerState } from '@ngrx/router-store';
import { Action, createReducer } from '@ngrx/store';

export const SELLSOUL_FEATURE_KEY = 'sellSoul';

// tslint:disable-next-line:no-empty-interface
export interface State {}

export interface SellSoulPartialState {
  readonly [SELLSOUL_FEATURE_KEY]: State;
  readonly router: RouterReducerState;
}

export const initialState: State = {};

const sellSoulReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action): State {
  return sellSoulReducer(state, action);
}
