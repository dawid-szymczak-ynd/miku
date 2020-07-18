import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { UserService } from '../../services/user.service';
import { UserEffects } from './user.effects';
import { UserFacade } from './user.facade';
import { reducer, State, USER_FEATURE_KEY } from './user.reducer';

interface TestSchema {
  user: State;
}

describe('UserFacade', () => {
  let facade: UserFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(USER_FEATURE_KEY, reducer), EffectsModule.forFeature([UserEffects])],
        providers: [UserFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({
        imports: [RootModule],
        providers: [{ provide: UserService, useValue: { getUserProfile: jest.fn(() => of({ id: 1 })) } }],
      });

      store = TestBed.inject(Store);
      facade = TestBed.inject(UserFacade);
    });

    it('loadUser() should load user', async (done) => {
      try {
        let selectedUser = await readFirst(facade.selectedUser$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(selectedUser).toBe(undefined);
        expect(isLoaded).toBe(false);

        facade.loadUser();

        selectedUser = await readFirst(facade.selectedUser$);
        isLoaded = await readFirst(facade.loaded$);

        expect(selectedUser).toEqual({ id: 1 });
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
