import { UserInterface } from '@miku-credit/api-interfaces';

import * as UserActions from './user.actions';
import { initialState, reducer, State } from './user.reducer';

describe('User Reducer', () => {
  describe('valid User actions', () => {
    it('loadUser should set default state', () => {
      const action = UserActions.loadUser();

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBe(null);
    });

    it('loadUserSuccess should user and selected id', () => {
      const action = UserActions.loadUserSuccess({ user: { id: 1 } as UserInterface });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.error).toBe(null);
      expect(result.ids.length).toBe(1);
      expect(result.selectedId).toBe(1);
    });

    it('loadUserFailure should set error', () => {
      const action = UserActions.loadUserFailure({ error: new Error() });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toEqual(new Error());
    });
  });
});
