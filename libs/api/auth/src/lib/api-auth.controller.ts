import { Controller, Get, Inject, OnModuleInit, Req, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';

@Controller('auth')
export class ApiAuthController implements OnModuleInit {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientKafka) {}

  public onModuleInit(): void {
    this.userServiceClient.subscribeToResponseOf('user.create');
    this.userServiceClient.subscribeToResponseOf('user.findByEmail');
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  public async googleAuth(): Promise<void> {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  public googleAuthRedirect(@Req() req: Request): Express.User {
    return req?.user;
  }
}
