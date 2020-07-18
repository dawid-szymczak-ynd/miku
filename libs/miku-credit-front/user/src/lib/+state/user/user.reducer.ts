import { UserInterface } from '@miku-credit/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as UserActions from './user.actions';

export const USER_FEATURE_KEY = 'user';

export interface State extends EntityState<UserInterface> {
  selectedId?: number;
  loaded: boolean;
  error?: Error;
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: State;
}

export const userAdapter: EntityAdapter<UserInterface> = createEntityAdapter<UserInterface>();

export const initialState: State = userAdapter.getInitialState({
  loaded: false,
});

const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state) => ({ ...state, loaded: false, error: null })),
  on(UserActions.loadUserSuccess, (state, { user }) =>
    userAdapter.setOne(user, { ...state, loaded: true, error: null, selectedId: user.id })
  ),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action): State {
  return userReducer(state, action);
}
