import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookKeeperCalculationController } from './book-keeper-calculation.controller';
import { BookKeeperCalculationService } from './book-keeper-calculation.service';
import { LoanTypeEntity } from './loan-type.entity';
import { LoanEntity } from './loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanTypeEntity, LoanEntity])],
  controllers: [BookKeeperCalculationController],
  providers: [BookKeeperCalculationService],
  exports: [BookKeeperCalculationService],
})
export class BookKeeperCalculationModule {}
