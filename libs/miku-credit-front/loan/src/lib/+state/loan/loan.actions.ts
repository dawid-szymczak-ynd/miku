import { LoanInterface } from '@miku-credit/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const loadLoansPage = createAction('[Loan] Load Loans Page', props<{ page: number }>());

export const loadLoansPageSuccess = createAction('[Loan] Load loans Page Success', props<{ loans: LoanInterface[] }>());

export const loadLoansPageFailure = createAction('[Loan] Load loans Page Failure', props<{ error: Error }>());

export const selectLoan = createAction('[Loan] Select Loan', props<{ loanId: number }>());
