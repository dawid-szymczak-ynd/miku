import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { PaybackService } from '../../services/payback.service';
import { PaybackEffects } from './payback.effects';
import { PaybackFacade } from './payback.facade';
import { PAYBACK_FEATURE_KEY, reducer, State } from './payback.reducer';

interface TestSchema {
  payback: State;
}

describe('PaybackFacade', () => {
  let facade: PaybackFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(PAYBACK_FEATURE_KEY, reducer), EffectsModule.forFeature([PaybackEffects])],
        providers: [PaybackFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({
        imports: [RootModule],
        providers: [{ provide: PaybackService, useValue: { calculatePaybackPlan: jest.fn(() => of({ id: 1 })) } }],
      });

      store = TestBed.inject(Store);
      facade = TestBed.inject(PaybackFacade);
    });

    it('calculatePaybackPlan() should dispatch calculatePaybackPlan action with calculation data and then paybackPlan should appear in state', async (done) => {
      try {
        let allPaybackPlans = await readFirst(facade.allPaybackPlans$);
        let isLoaded = await readFirst(facade.loaded$);
        let selectedPaybackPlan = await readFirst(facade.selectedPaybackPlan$);

        expect(allPaybackPlans.length).toBe(0);
        expect(isLoaded).toBe(false);
        expect(selectedPaybackPlan).toBe(undefined);

        facade.calculatePaybackPlan({ scoring: 10, months: 10, loanId: 1, amount: 1000, startDate: '123' });

        allPaybackPlans = await readFirst(facade.allPaybackPlans$);
        isLoaded = await readFirst(facade.loaded$);
        selectedPaybackPlan = await readFirst(facade.selectedPaybackPlan$);

        expect(allPaybackPlans.length).toBe(1);
        expect(isLoaded).toBe(true);
        expect(selectedPaybackPlan).toEqual({ id: 1 });

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
