import { UserInterface } from '@miku-credit/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class User implements UserInterface {
  @ApiProperty({ description: 'User ID' })
  public id?: number;

  @ApiProperty({ description: 'User Name' })
  public name: string;

  @ApiProperty({ description: 'User Email' })
  public email: string;

  @ApiProperty({ description: 'User Scoring' })
  public scoring: number;
}
