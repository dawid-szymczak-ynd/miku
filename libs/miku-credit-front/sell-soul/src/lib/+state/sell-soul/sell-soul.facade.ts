import { Injectable } from '@angular/core';
import {
  CalculatePaybackPlanBody,
  LoanInterface,
  PaybackPlanInterface,
  UserInterface,
} from '@miku-credit/api-interfaces';
import { LoanFacade } from '@miku-credit/miku-credit-front/loan';
import { PaybackFacade } from '@miku-credit/miku-credit-front/payback';
import { UserFacade } from '@miku-credit/miku-credit-front/user';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromSellSoul from './sell-soul.reducer';
import * as SellSoulSelectors from './sell-soul.selectors';

@Injectable()
export class SellSoulFacade {
  public readonly currentStep$: Observable<string> = this.store.pipe(select(SellSoulSelectors.getActiveStepIndex));
  public readonly user$: Observable<UserInterface> = this.userFacade.selectedUser$;
  public readonly loans$: Observable<LoanInterface[]> = this.loanFacade.allLoans$;
  public readonly selectedLoan$: Observable<LoanInterface> = this.loanFacade.selectedLoan$;
  public readonly paybackPlan$: Observable<PaybackPlanInterface> = this.paybackFacade.selectedPaybackPlan$;

  constructor(
    private readonly store: Store<fromSellSoul.SellSoulPartialState>,
    private readonly userFacade: UserFacade,
    private readonly loanFacade: LoanFacade,
    private readonly paybackFacade: PaybackFacade
  ) {}

  public loadLoans(page: number): void {
    this.loanFacade.loadLoansPage(page);
  }

  public selectLoan(loanId: number): void {
    this.loanFacade.selectLoan(loanId);
  }

  public calculatePaybackPlan(calculatePaybackPlanBody: CalculatePaybackPlanBody): void {
    this.paybackFacade.calculatePaybackPlan(calculatePaybackPlanBody);
  }
}
