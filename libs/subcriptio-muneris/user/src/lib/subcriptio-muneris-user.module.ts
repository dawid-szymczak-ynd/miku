import { Module } from '@nestjs/common';

import { SubcriptioMunerisUserController } from './subcriptio-muneris-user.controller';
import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

@Module({
  controllers: [SubcriptioMunerisUserController],
  providers: [SubcriptioMunerisUserService],
  exports: [SubcriptioMunerisUserService],
})
export class SubcriptioMunerisUserModule {}
