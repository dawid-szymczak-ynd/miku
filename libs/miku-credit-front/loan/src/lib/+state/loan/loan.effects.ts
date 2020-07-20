import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoanService } from '../../services/loan.service';
import * as LoanActions from './loan.actions';

@Injectable()
export class LoanEffects {
  public loadLoan$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LoanActions.loadLoansPage),
      fetch({
        run: ({ page }) =>
          this.loanService.getLoansPage(page).pipe(map((loans) => LoanActions.loadLoansPageSuccess({ loans }))),
        onError: (action, error) => LoanActions.loadLoansPageFailure({ error }),
      })
    )
  );

  constructor(private readonly actions$: Actions, private readonly loanService: LoanService) {}
}
