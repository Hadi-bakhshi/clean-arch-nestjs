import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments

    if (err || !user) {
      throw (
        // err ||
        new UnauthorizedException('خطای عدم احراز هویت', {
          cause: new Error(),
          description:
            err ||
            'خطای ایجاد شده به دلیل عدم احراز هویت ، وجود اعتبارنامه های نامعتبر یا منقضی می باشد',
        })
      );
    }
    return user;
  }
}
