export interface LoanInterface {
  id?: number;
  type_id: number;
  name: string;
  max_length: number;
  min_length: number;
  max_amount: number;
  min_amount: number;
  rate: number;
  recuired_scoring: number;
}
