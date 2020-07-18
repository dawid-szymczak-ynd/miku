import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MikuCreditFrontLoanModule } from '@miku-credit/miku-credit-front/loan';
import { MikuCreditFrontPaybackModule } from '@miku-credit/miku-credit-front/payback';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './main.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NxModule.forRoot(),
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Registration state',
      logOnly: environment.production,
    }),
    HttpClientModule,
    MikuCreditFrontLoanModule,
    MikuCreditFrontPaybackModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
