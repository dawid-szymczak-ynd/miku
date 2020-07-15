import { UserInterface } from '@miku-credit/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindConditions, InsertResult, Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class SubcriptioMunerisUserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public findOne(findConditions: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne(findConditions);
  }

  public create(user: UserInterface): Promise<InsertResult> {
    const userEntity = this.userRepository.create(user);

    return this.userRepository.insert(userEntity);
  }
}
