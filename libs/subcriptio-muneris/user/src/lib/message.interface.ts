import { UserInterface } from '@miku-credit/api-interfaces';

export interface FindUserByIdMessage {
  id: number;
}

export interface CreateUserMessage {
  userData: UserInterface;
}
