import { CreateUserMessage, FindUserByEmailMessage, UserInterface } from '@miku-credit/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ApiAuthService {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientKafka) {}

  public authorizeUser(email: string, name?: string): Observable<UserInterface> {
    return this.userServiceClient
      .send<UserInterface, FindUserByEmailMessage>('user.findByEmail', { email })
      .pipe(
        switchMap((user) => {
          if (user) {
            return of(user);
          }

          return this.userServiceClient.send<UserInterface, CreateUserMessage>('user.create', {
            userData: {
              email,
              name,
              scoring: 100,
            },
          });
        })
      );
  }
}
