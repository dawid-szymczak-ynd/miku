import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomepageContainerComponent } from './homepage-container/homepage-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomepageContainerComponent },
    ]),
  ],
  declarations: [HomepageContainerComponent],
})
export class MikuCreditFrontHomepageModule {}
