import { HttpStatus } from '@nestjs/common';
import { Exception } from './exception';

export class ExceptionUnauthorized extends Exception {
  statusCode = HttpStatus.UNAUTHORIZED;
}
