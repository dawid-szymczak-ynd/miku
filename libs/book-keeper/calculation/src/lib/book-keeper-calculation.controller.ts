import { Controller } from '@nestjs/common';

import { BookKeeperCalculationService } from './book-keeper-calculation.service';

@Controller('book-keeper-calculation')
export class BookKeeperCalculationController {
  constructor(private readonly bookKeeperCalculationService: BookKeeperCalculationService) {}
}
