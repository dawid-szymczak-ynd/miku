import { LoanInterface } from '@miku-credit/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LoanEntity } from './loan.entity';

@Injectable()
export class BookKeeperCalculationService {
  constructor(@InjectRepository(LoanEntity) private readonly loanEntityRepository: Repository<LoanEntity>) {}

  public getChunk(take: number = 10, skip: number = 0): Promise<LoanInterface[]> {
    return this.loanEntityRepository.find({ take, skip, order: { id: 'ASC' }, relations: ['type'] }).then((result) => {
      if (result) {
        return result.map((loanEntity) => ({ ...loanEntity }));
      }

      return undefined;
    });
  }

  public findOneById(id: number): Promise<LoanEntity> {
    return this.loanEntityRepository.findOne({ where: { id } });
  }
}
