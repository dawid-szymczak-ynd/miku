export interface Payments {
  date: string;
  base: number;
  interest: number;
  index: number;
}

export interface PaybackPlanInterface {
  id: number;
  payments: Payments[];
  latPaymentDate: string;
  allToRepay: number;
  allInterest: number;
  scoringInfluence: number;
}
