import { Controller } from '@nestjs/common';

import { SubcriptioMunerisUserService } from './subcriptio-muneris-user.service';

@Controller('subcriptio-muneris-user')
export class SubcriptioMunerisUserController {
  constructor(private readonly subcriptioMunerisUserService: SubcriptioMunerisUserService) {}
}
