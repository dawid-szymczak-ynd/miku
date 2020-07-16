import { UserInterface } from '@miku-credit/api-interfaces';

import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique(['name'])
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public scoring: number;
}
