import { Controller, Get, Inject, OnModuleInit, Res, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

import { Response } from 'express';

@Controller('auth')
export class ApiAuthController implements OnModuleInit {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientKafka) {}

  public onModuleInit(): void {
    this.userServiceClient.subscribeToResponseOf('user.create');
    this.userServiceClient.subscribeToResponseOf('user.findByEmail');
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  public googleAuth(): void {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  public googleAuthRedirect(@Res() res: Response): void {
    res.redirect('/sell-soul/first-step');
  }
}
