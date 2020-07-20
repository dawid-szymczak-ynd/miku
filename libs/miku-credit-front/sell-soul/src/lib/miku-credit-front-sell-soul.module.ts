import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UserGuard } from '@miku-credit/miku-credit-front/user';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SellSoulFacade } from './+state/sell-soul/sell-soul.facade';
import * as fromSellSoul from './+state/sell-soul/sell-soul.reducer';
import { FirstVisitGuard } from './guards/first-visit.guard';
import { LoginComponent } from './login/login.component';
import { SellSoulContainerComponent } from './sell-soul-container/sell-soul-container.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'flow/:status',
        component: SellSoulContainerComponent,
        canActivate: [UserGuard, FirstVisitGuard],
        children: [
          {
            path: ':id',
            component: SellSoulContainerComponent,
          },
        ],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ]),
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    StoreModule.forFeature(fromSellSoul.SELLSOUL_FEATURE_KEY, fromSellSoul.reducer),
    EffectsModule.forFeature([]),
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  declarations: [SellSoulContainerComponent, LoginComponent],
  providers: [SellSoulFacade, FirstVisitGuard],
})
export class MikuCreditFrontSellSoulModule {}
