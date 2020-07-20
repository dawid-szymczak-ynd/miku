import { Injectable } from '@angular/core';
import { CalculatePaybackPlanBody, PaybackPlanInterface } from '@miku-credit/api-interfaces';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { calculatePaybackPlan } from './payback.actions';
import * as fromPayback from './payback.reducer';
import * as PaybackSelectors from './payback.selectors';

@Injectable()
export class PaybackFacade {
  public loaded$: Observable<boolean> = this.store.pipe(select(PaybackSelectors.getPaybackLoaded));
  public allPaybackPlans$: Observable<PaybackPlanInterface[]> = this.store.pipe(select(PaybackSelectors.getAllPayback));
  public selectedPaybackPlan$: Observable<PaybackPlanInterface> = this.store.pipe(select(PaybackSelectors.getSelected));
  public error$: Observable<Error> = this.store.pipe(select(PaybackSelectors.getPaybackError));

  constructor(private readonly store: Store<fromPayback.PaybackPartialState>) {}

  public calculatePaybackPlan(calculatePaybackPlanBody: CalculatePaybackPlanBody): void {
    this.store.dispatch(calculatePaybackPlan({ calculatePaybackPlanBody }));
  }
}
