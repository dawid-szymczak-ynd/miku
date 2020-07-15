import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { OAuth2Strategy, Profile, VerifyFunction } from 'passport-google-oauth';
import { Observable, throwError } from 'rxjs';
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

  public validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyFunction): Observable<void> {
    const { emails } = profile;

    return this.authService.authorizeUser(profile).pipe(
      map((user) => done(null, { ...user, accessToken })),
      catchError((error) => {
        done(error, { email: emails[0].value });

        return throwError(error);
      })
    );
  }
}
