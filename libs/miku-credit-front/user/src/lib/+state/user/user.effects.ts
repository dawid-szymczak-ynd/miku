import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  public loadUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      fetch({
        run: () => this.userService.getUserProfile().pipe(map((user) => UserActions.loadUserSuccess({ user }))),
        onError: (action, error) => UserActions.loadUserFailure({ error }),
      })
    )
  );

  constructor(private readonly actions$: Actions, private readonly userService: UserService) {}
}
