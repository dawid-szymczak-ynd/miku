import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { OAuth2Strategy, Profile, VerifyFunction } from 'passport-google-oauth';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiAuthService } from './api-auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(private readonly authService: ApiAuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'https://mikucredit.com/api/auth/redirect',
      scope: ['email', 'profile'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyFunction
  ): Promise<void> {
    return await this.authService
      .authorizeUser(profile)
      .pipe(
        map((user) => done(null, { ...user, accessToken, refreshToken })),
        catchError((error) => {
          done(new UnauthorizedException(error), null);

          return throwError(new UnauthorizedException(error));
        })
      )
      .toPromise();
  }
}
