import { TestBed } from '@angular/core/testing';
import { UserInterface } from '@miku-credit/api-interfaces';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Observable, of } from 'rxjs';

import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';
import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions: Observable<Action>;
  let effects: UserEffects;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UserEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: UserService, useValue: { getUserProfile: jest.fn(() => of({ id: 1 })) } },
      ],
    });

    effects = TestBed.inject(UserEffects);
    userService = TestBed.inject(UserService);
  });

  describe('loadUser$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UserActions.loadUser() });

      const expected = hot('-a-|', { a: UserActions.loadUserSuccess({ user: { id: 1 } as UserInterface }) });
      const { getUserProfile } = userService;

      expect(effects.loadUser$).toBeObservable(expected);
      expect(getUserProfile).toBeCalled();
    });
  });
});
