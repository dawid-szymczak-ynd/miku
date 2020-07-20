import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoanEffects } from './+state/loan/loan.effects';
import { LoanFacade } from './+state/loan/loan.facade';
import * as fromLoan from './+state/loan/loan.reducer';
import { LoanService } from './services/loan.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLoan.LOAN_FEATURE_KEY, fromLoan.reducer),
    EffectsModule.forFeature([LoanEffects]),
  ],
  providers: [LoanFacade, LoanService],
})
export class MikuCreditFrontLoanModule {}
