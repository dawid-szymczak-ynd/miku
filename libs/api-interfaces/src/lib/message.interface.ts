import { UserInterface } from '@miku-credit/api-interfaces';

export interface FindUserByIdMessage {
  email: string;
}

export interface CreateUserMessage {
  userData: UserInterface;
}
