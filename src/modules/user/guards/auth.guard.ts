import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enums/role.enum';
import { ExceptionUnauthorized } from '../../common/exception/exception-unauthorized';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  public handleRequest(err: any, user: any, info: any, context: any): any {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles && !user) {
      throw new ExceptionUnauthorized('messages.common.errors.unauthorized');
    }

    if (roles && roles.includes(Role.PUBLIC)) {
      return user;
    }

    if (!user.id) {
      throw new ExceptionUnauthorized('messages.common.errors.unauthorized');
    }

    return user;
  }
}
