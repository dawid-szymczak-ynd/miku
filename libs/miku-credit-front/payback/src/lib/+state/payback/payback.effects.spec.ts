import { TestBed } from '@angular/core/testing';
import { CalculatePaybackPlanBody, PaybackPlanInterface } from '@miku-credit/api-interfaces';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Observable, of } from 'rxjs';

import { PaybackService } from '../../services/payback.service';
import * as PaybackActions from './payback.actions';
import { PaybackEffects } from './payback.effects';

describe('PaybackEffects', () => {
  let actions: Observable<Action>;
  let effects: PaybackEffects;
  let paybackService: PaybackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        PaybackEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: PaybackService, useValue: { calculatePaybackPlan: jest.fn(() => of({})) } },
      ],
    });

    effects = TestBed.inject(PaybackEffects);
    paybackService = TestBed.inject(PaybackService);
  });

  describe('loadPayback$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: PaybackActions.calculatePaybackPlan({ calculatePaybackPlanBody: {} as CalculatePaybackPlanBody }),
      });

      const expected = hot('-a-|', {
        a: PaybackActions.calculatePaybackPlanSuccess({ paybackPlan: {} as PaybackPlanInterface }),
      });
      const { calculatePaybackPlan } = paybackService;

      expect(effects.loadPayback$).toBeObservable(expected);
      expect(calculatePaybackPlan).toBeCalledWith({});
    });
  });
});
