import { UserInterface } from '@miku-credit/api-interfaces';

export interface FindUserByIdMessage {
  email: string;
}

export interface CreateUserMessage {
  userData: UserInterface;
}

export interface CalculatePaybackPlanMessage {
  loanId: number;
  amount: number;
  months: number;
  startDate: string;
  scoring: number;
}

export interface LoansGetChunkMessage {
  take: number;
  skip: number;
}
