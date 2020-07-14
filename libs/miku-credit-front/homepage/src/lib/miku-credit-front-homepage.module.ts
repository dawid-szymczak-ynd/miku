import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { HomepageContainerComponent } from './homepage-container/homepage-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: HomepageContainerComponent }]),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  declarations: [HomepageContainerComponent],
})
export class MikuCreditFrontHomepageModule {}
