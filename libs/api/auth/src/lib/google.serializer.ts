import { FindUserByEmailMessage, User, UserInterface } from '@miku-credit/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class GoogleSerializer extends PassportSerializer {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientKafka) {
    super();
  }

  public serializeUser(user: User, done: CallableFunction): void {
    done(null, user.email);
  }

  public async deserializeUser(email: string, done: CallableFunction): Promise<void> {
    return await this.userServiceClient
      .send<UserInterface, FindUserByEmailMessage>('user.findByEmail', { email })
      .toPromise()
      .then((user) => done(null, user))
      .catch((error) => done(error));
  }
}
