import { UserInterface } from '@miku-credit/api-interfaces';

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public scoring: number;
}
