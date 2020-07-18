import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects } from './+state/user/user.effects';
import { UserFacade } from './+state/user/user.facade';
import * as fromUser from './+state/user/user.reducer';
import { UserGuard } from './guards/user.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [
    UserFacade,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserGuard,
  ],
})
export class MikuCreditFrontUserModule {}
