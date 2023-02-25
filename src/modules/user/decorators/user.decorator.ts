import { ArgumentsHost, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../user.entity';

export const CurrentUser = createParamDecorator(
  (data, host: ArgumentsHost): User => {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    return request as unknown as User;
  },
);
