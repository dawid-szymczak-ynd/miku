import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import { of } from 'rxjs';

import { LoanService } from '../../services/loan.service';
import { LoanEffects } from './loan.effects';
import { LoanFacade } from './loan.facade';
import { LOAN_FEATURE_KEY, reducer, State } from './loan.reducer';

interface TestSchema {
  loan: State;
}

describe('LoanFacade', () => {
  let facade: LoanFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(LOAN_FEATURE_KEY, reducer), EffectsModule.forFeature([LoanEffects])],
        providers: [LoanFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({
        imports: [RootModule],
        providers: [{ provide: LoanService, useValue: { getLoansPage: jest.fn(() => of([{ id: 1 }])) } }],
      });

      store = TestBed.inject(Store);
      facade = TestBed.inject(LoanFacade);
    });

    it('loadLoansPage() should load page of loans', async (done) => {
      try {
        let allLoans = await readFirst(facade.allLoans$);
        let loaded = await readFirst(facade.loaded$);
        let currentPage = await readFirst(facade.currentPage$);

        expect(allLoans.length).toBe(0);
        expect(loaded).toBe(false);
        expect(currentPage).toBe(-1);

        facade.loadLoansPage(0);

        allLoans = await readFirst(facade.allLoans$);
        loaded = await readFirst(facade.loaded$);
        currentPage = await readFirst(facade.currentPage$);

        expect(allLoans.length).toBe(1);
        expect(loaded).toBe(true);
        expect(currentPage).toBe(0);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('selectLoan() should set selectedId', async (done) => {
      try {
        let allLoans = await readFirst(facade.allLoans$);
        let loaded = await readFirst(facade.loaded$);
        let currentPage = await readFirst(facade.currentPage$);
        let selectedLoan = await readFirst(facade.selectedLoan$);

        expect(allLoans.length).toBe(0);
        expect(loaded).toBe(false);
        expect(currentPage).toBe(-1);
        expect(selectedLoan).toBe(undefined);

        facade.loadLoansPage(0);
        facade.selectLoan(1);

        allLoans = await readFirst(facade.allLoans$);
        loaded = await readFirst(facade.loaded$);
        currentPage = await readFirst(facade.currentPage$);
        selectedLoan = await readFirst(facade.selectedLoan$);

        expect(allLoans.length).toBe(1);
        expect(loaded).toBe(true);
        expect(currentPage).toBe(0);
        expect(selectedLoan).toEqual({ id: 1 });

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
