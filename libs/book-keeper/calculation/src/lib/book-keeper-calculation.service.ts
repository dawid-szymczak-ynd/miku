import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LoanEntity } from './loan.entity';

@Injectable()
export class BookKeeperCalculationService {
  constructor(@InjectRepository(LoanEntity) private readonly loanEntityRepository: Repository<LoanEntity>) {}

  public getChunk(take: number, skip: number): Promise<LoanEntity[]> {
    return this.loanEntityRepository.find({ take, skip, order: { id: 'ASC' } });
  }

  public findOneById(id: number): Promise<LoanEntity> {
    return this.loanEntityRepository.findOne({ where: { id } });
  }
}
