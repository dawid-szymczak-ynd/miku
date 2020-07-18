import { User } from '@miku-credit/api-interfaces';
import { Controller, Get, Inject, OnModuleInit, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

import { Request, Response } from 'express';

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

  @Post('profile')
  @UseGuards(AuthGuard('google'))
  public getProfile(@Req() req: Request): User {
    return req.user as User;
  }
}
