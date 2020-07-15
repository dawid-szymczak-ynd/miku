import { Module } from '@nestjs/common';

import { BookKeeperCalculationController } from './book-keeper-calculation.controller';
import { BookKeeperCalculationService } from './book-keeper-calculation.service';

@Module({
  controllers: [BookKeeperCalculationController],
  providers: [BookKeeperCalculationService],
  exports: [BookKeeperCalculationService],
})
export class BookKeeperCalculationModule {}
