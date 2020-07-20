import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LoanInterface, PaybackPlanInterface, Payment, UserInterface } from '@miku-credit/api-interfaces';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SellSoulFacade } from '../+state/sell-soul/sell-soul.facade';

@Component({
  selector: 'miku-credit-sell-soul-container',
  templateUrl: './sell-soul-container.component.html',
  styleUrls: ['./sell-soul-container.component.scss'],
})
export class SellSoulContainerComponent implements OnInit {
  public currentStep$: Observable<string> = this.sellSoulFacade.currentStep$;
  public user$: Observable<UserInterface> = this.sellSoulFacade.user$;
  public loans$: Observable<LoanInterface[]> = this.sellSoulFacade.loans$;
  public currentLoan$: Observable<LoanInterface> = this.sellSoulFacade.selectedLoan$;
  public paybackPlan$: Observable<PaybackPlanInterface> = this.sellSoulFacade.paybackPlan$;
  public dataSource$: Observable<MatTableDataSource<Payment>> = this.paybackPlan$.pipe(
    map((paybackPlan) => new MatTableDataSource<Payment>(paybackPlan.payments))
  );
  public formModel: FormGroup = this.formBuilder.group({
    amount: ['', Validators.required],
    months: ['', Validators.required],
    startDate: ['', Validators.required],
  });

  constructor(private readonly sellSoulFacade: SellSoulFacade, private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.sellSoulFacade.loadLoans(0);
  }

  public chooseLoan(loanId: number): void {
    this.sellSoulFacade.selectLoan(loanId);
  }

  public calculatePaybackPlan(loanId: number, scoring: number): void {
    const { amount, months, startDate } = this.formModel.getRawValue();

    this.sellSoulFacade.calculatePaybackPlan({ loanId, scoring, startDate: startDate.getTime(), amount, months });
  }
}
