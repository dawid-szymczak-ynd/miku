import { LoanTypeInterface } from '@miku-credit/api-interfaces';

import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { LoanEntity } from './loan.entity';

@Entity({ name: 'loans_types' })
export class LoanTypeEntity extends BaseEntity implements LoanTypeInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany((type) => LoanEntity, (loanEntity) => loanEntity.type)
  public loans: LoanEntity[];
}
