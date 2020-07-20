import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaybackService } from '../../services/payback.service';
import * as PaybackActions from './payback.actions';

@Injectable()
export class PaybackEffects {
  public loadPayback$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PaybackActions.calculatePaybackPlan),
      fetch({
        run: ({ calculatePaybackPlanBody }) =>
          this.paybackService
            .calculatePaybackPlan(calculatePaybackPlanBody)
            .pipe(map((paybackPlan) => PaybackActions.calculatePaybackPlanSuccess({ paybackPlan }))),
        onError: (action, error) => PaybackActions.calculatePaybackPlanFailure({ error }),
      })
    )
  );

  constructor(private readonly actions$: Actions, private readonly paybackService: PaybackService) {}
}
