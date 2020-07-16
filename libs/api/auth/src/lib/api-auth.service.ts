import { CreateUserMessage, FindUserByIdMessage, UserInterface } from '@miku-credit/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Profile } from 'passport';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ApiAuthService {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientKafka) {}

  public authorizeUser({ emails, name }: Profile): Observable<UserInterface> {
    return this.userServiceClient
      .send<UserInterface, FindUserByIdMessage>('user.findByEmail', { email: emails[0].value })
      .pipe(
        switchMap((response) => {
          if (response?.id) {
            return of(response);
          }

          return this.userServiceClient.send<UserInterface, CreateUserMessage>('user.create', {
            userData: {
              email: emails[0].value,
              name: name.givenName,
              scoring: 100,
            },
          });
        })
      );
  }
}
