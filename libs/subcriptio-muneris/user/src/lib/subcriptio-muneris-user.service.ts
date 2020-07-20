import { UserInterface } from '@miku-credit/api-interfaces';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindConditions, Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class SubcriptioMunerisUserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public findOne(findConditions: FindConditions<User>): Promise<UserInterface> {
    return this.userRepository.findOne(findConditions).then((result) => {
      if (result) {
        return { ...result };
      }

      return result;
    });
  }

  public create(user: UserInterface): Promise<UserInterface> {
    const userEntity = this.userRepository.create(user);

    return this.userRepository.save([userEntity]).then((result) => {
      if (result[0]) {
        return { ...result[0] };
      }

      throw new UnprocessableEntityException(user);
    });
  }
}
