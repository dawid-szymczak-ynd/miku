import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PaybackEffects } from './+state/payback/payback.effects';
import { PaybackFacade } from './+state/payback/payback.facade';
import * as fromPayback from './+state/payback/payback.reducer';
import { PaybackService } from './services/payback.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromPayback.PAYBACK_FEATURE_KEY, fromPayback.reducer),
    EffectsModule.forFeature([PaybackEffects]),
  ],
  providers: [PaybackFacade, PaybackService],
})
export class MikuCreditFrontPaybackModule {}
