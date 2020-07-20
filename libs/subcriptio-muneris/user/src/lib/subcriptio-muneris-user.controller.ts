import { CreateUserMessage, FindUserByEmailMessage, UserInterface } from '@miku-credit/api-interfaces';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

@Controller('subcriptio-muneris-user')
export class SubcriptioMunerisUserController {
  constructor(private readonly subcriptioMunerisUserService: SubcriptioMunerisUserService) {}

  @MessagePattern('user.create')
  public createUser(@Payload() message: { value: CreateUserMessage }): Promise<UserInterface> {
    return this.subcriptioMunerisUserService.create(message.value.userData).catch((error) => {
      throw new RpcException(error);
    });
  }

  @MessagePattern('user.findByEmail')
  public findUser(@Payload() message: { value: FindUserByEmailMessage }): Promise<UserInterface> {
    return this.subcriptioMunerisUserService.findOne({ email: message.value.email });
  }
}
