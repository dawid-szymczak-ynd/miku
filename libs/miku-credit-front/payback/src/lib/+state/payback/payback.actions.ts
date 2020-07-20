import { CalculatePaybackPlanBody, PaybackPlanInterface } from '@miku-credit/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const calculatePaybackPlan = createAction(
  '[Payback] Calculate Payback Plan',
  props<{ calculatePaybackPlanBody: CalculatePaybackPlanBody }>()
);

export const calculatePaybackPlanSuccess = createAction(
  '[Payback] Calculate Payback Plan Success',
  props<{ paybackPlan: PaybackPlanInterface }>()
);

export const calculatePaybackPlanFailure = createAction(
  '[Payback] Calculate Payback Plan Failure',
  props<{ error: Error }>()
);
