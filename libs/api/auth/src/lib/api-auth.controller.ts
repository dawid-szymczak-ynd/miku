import { Controller } from '@nestjs/common';

import { ApiAuthService } from './api-auth.service';

@Controller('api-auth')
export class ApiAuthController {
  constructor(private readonly apiAuthService: ApiAuthService) {}
}
