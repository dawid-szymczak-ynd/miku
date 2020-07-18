import { UserInterface } from '@miku-credit/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction('[User] Load User');

export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: UserInterface }>());

export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: Error }>());

export const clearUser = createAction('[User] Clear User', props<{ error?: Error }>());
