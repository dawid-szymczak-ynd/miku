import { User } from '@miku-credit/api-interfaces';
import { Controller, Get, Inject, OnModuleInit, Req, Res, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';

import { Request, Response } from 'express';

import { GoogleAuthLoginGuard } from './google-auth-login.guard';
import { GoogleAuthenticatedGuard } from './google-authenticated.guard';

@Controller('auth')
export class ApiAuthController implements OnModuleInit {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientKafka) {}

  public onModuleInit(): void {
    this.userServiceClient.subscribeToResponseOf('user.create');
    this.userServiceClient.subscribeToResponseOf('user.findByEmail');
  }

  @Get()
  @UseGuards(new GoogleAuthLoginGuard())
  public googleAuth(): void {}

  @Get('redirect')
  @UseGuards(new GoogleAuthLoginGuard())
  public googleAuthRedirect(@Res() res: Response): void {
    res.redirect('/sell-soul/flow/first-step');
  }

  @Get('profile')
  @ApiResponse({ status: 200, type: User })
  @UseGuards(new GoogleAuthenticatedGuard())
  public getProfile(@Req() req: Request): User {
    return req.user as User;
  }
}
