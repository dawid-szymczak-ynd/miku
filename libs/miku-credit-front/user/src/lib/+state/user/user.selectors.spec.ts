import { UserInterface } from '@miku-credit/api-interfaces';

import { initialState, userAdapter } from './user.reducer';
import * as UserSelectors from './user.selectors';

describe('User Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      user: userAdapter.setAll([{ id: 1 } as UserInterface], {
        ...initialState,
        selectedId: 1,
        error: null,
        loaded: true,
      }),
    };
  });

  describe('User Selectors', () => {
    it('getSelected() should return the selected Entity', () => {
      const result = UserSelectors.getSelected(state);

      expect(result.id).toBe(1);
    });

    it("getUserLoaded() should return the current 'loaded' status", () => {
      const result = UserSelectors.getUserLoaded(state);

      expect(result).toBe(true);
    });

    it("getUserError() should return the current 'error' state", () => {
      const result = UserSelectors.getUserError(state);

      expect(result).toBe(null);
    });
  });
});
