import { LoanTypeInterface } from '@miku-credit/api-interfaces';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoanTypeEntity implements LoanTypeInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}
