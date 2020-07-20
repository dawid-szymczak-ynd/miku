import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthLoginGuard extends AuthGuard('google') {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(context)) as boolean;

    if (canActivate) {
      const request = context.switchToHttp().getRequest();

      await super.logIn(request);
    }

    return canActivate;
  }
}
