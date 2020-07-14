import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SellSoulContainerComponent } from './sell-soul-container/sell-soul-container.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([{ path: '', pathMatch: 'full', component: SellSoulContainerComponent }]),
  ],
  declarations: [SellSoulContainerComponent],
})
export class MikuCreditFrontSellSoulModule {}
