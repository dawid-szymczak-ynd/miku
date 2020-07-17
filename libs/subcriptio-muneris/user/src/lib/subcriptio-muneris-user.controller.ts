import { CreateUserMessage, FindUserByIdMessage, UserInterface } from '@miku-credit/api-interfaces';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

@Controller('subcriptio-muneris-user')
export class SubcriptioMunerisUserController {
  constructor(private readonly subcriptioMunerisUserService: SubcriptioMunerisUserService) {}

  @MessagePattern('user.create')
  public createUser(@Payload() message: { value: CreateUserMessage }): Promise<UserInterface> {
    return this.subcriptioMunerisUserService.create(message.value.userData).then((insertResult) => insertResult.raw);
  }

  @MessagePattern('user.findByEmail')
  public findUser(@Payload() message: { value: FindUserByIdMessage }): Promise<UserInterface> {
    return this.subcriptioMunerisUserService.findOne({ email: message.value.email });
  }
}
