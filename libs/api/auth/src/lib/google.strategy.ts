import { UserInterface } from '@miku-credit/api-interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { OAuth2Strategy, Profile } from 'passport-google-oauth';

import { ApiAuthService } from './api-auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(private readonly authService: ApiAuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  public async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<UserInterface> {
    try {
      const user = await this.authService.authorizeUser(profile.emails[0]?.value, profile.displayName).toPromise();

      if (user) {
        return user;
      }

      throw new UnauthorizedException();
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
