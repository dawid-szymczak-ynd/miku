import { UserInterface } from '@miku-credit/api-interfaces';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateUserMessage, FindUserByIdMessage } from './message.interface';
import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

@Controller('subcriptio-muneris-user')
export class SubcriptioMunerisUserController {
  constructor(private readonly subcriptioMunerisUserService: SubcriptioMunerisUserService) {}

  @MessagePattern('user.create')
  public createUser(@Payload() { userData }: CreateUserMessage): Promise<UserInterface> {
    return this.subcriptioMunerisUserService.create(userData).then((insertResult) => insertResult.raw);
  }

  @MessagePattern('user.findById')
  public findUser(@Payload() { id }: FindUserByIdMessage): Promise<UserInterface> {
    return this.subcriptioMunerisUserService.findOne({ id });
  }
}
