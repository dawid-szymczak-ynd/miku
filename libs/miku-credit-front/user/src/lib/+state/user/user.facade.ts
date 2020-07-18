import { Injectable } from '@angular/core';
import { UserInterface } from '@miku-credit/api-interfaces';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { loadUser } from './user.actions';
import * as fromUser from './user.reducer';
import * as UserSelectors from './user.selectors';

@Injectable()
export class UserFacade {
  public loaded$: Observable<boolean> = this.store.pipe(select(UserSelectors.getUserLoaded));
  public selectedUser$: Observable<UserInterface> = this.store.pipe(select(UserSelectors.getSelected));

  constructor(private readonly store: Store<fromUser.UserPartialState>) {}

  public loadUser(): void {
    this.store.dispatch(loadUser());
  }
}
