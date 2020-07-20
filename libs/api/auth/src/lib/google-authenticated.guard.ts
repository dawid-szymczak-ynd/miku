import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthenticatedGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return !!request.user;
  }
}
