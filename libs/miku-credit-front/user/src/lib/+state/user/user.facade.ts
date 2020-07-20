import { Injectable } from '@angular/core';
import { UserInterface } from '@miku-credit/api-interfaces';
import { select, Store } from '@ngrx/store';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { clearUser, loadUser } from './user.actions';
import * as fromUser from './user.reducer';
import * as UserSelectors from './user.selectors';

@Injectable()
export class UserFacade {
  public loaded$: Observable<boolean> = this.store.pipe(select(UserSelectors.getUserLoaded));
  public error$: Observable<Error> = this.store.pipe(select(UserSelectors.getUserError));
  public selectedUser$: Observable<UserInterface> = this.store.pipe(select(UserSelectors.getSelected));
  public isLoggedIn$: Observable<boolean> = combineLatest([this.loaded$, this.selectedUser$]).pipe(
    map(([loaded, user]) => loaded && !!user)
  );

  constructor(private readonly store: Store<fromUser.UserPartialState>) {}

  public loadUser(): void {
    this.store.dispatch(loadUser());
  }

  public clearUser(error?: Error): void {
    this.store.dispatch(clearUser({ error }));
  }
}
