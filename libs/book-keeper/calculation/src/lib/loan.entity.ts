import { LoanInterface } from '@miku-credit/api-interfaces';

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LoanTypeEntity } from './loan-type.entity';

@Entity({ name: 'loans' })
export class LoanEntity extends BaseEntity implements LoanInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public max_length: number;

  @Column()
  public min_length: number;

  @Column()
  public max_amount: number;

  @Column()
  public min_amount: number;

  @Column()
  public rate: number;

  @Column()
  public recuired_scoring: number;

  @Column()
  public type_id: number;

  @JoinColumn({ name: 'type_id' })
  @ManyToOne((type) => LoanTypeEntity, (loanTypeEntity) => loanTypeEntity.loans)
  public type: LoanTypeEntity;
}
