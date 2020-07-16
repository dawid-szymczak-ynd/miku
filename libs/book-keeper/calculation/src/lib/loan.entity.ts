import { LoanInterface } from '@miku-credit/api-interfaces';

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LoanTypeEntity } from './loan-type.entity';

@Entity()
export class LoanEntity implements LoanInterface {
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

  @OneToOne((type) => LoanTypeEntity)
  @JoinColumn({ name: 'type_id' })
  public type: LoanTypeEntity;
}
