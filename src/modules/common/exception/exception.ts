import { HttpStatus } from '@nestjs/common';

export class Exception extends Error {
  statusCode: number;

  message: string;

  context?: Error;

  constructor(message: string, context?: Error, statusCode?: number) {
    super(message);
    this.message = message;
    this.context = context;
    this.statusCode = statusCode || HttpStatus.BAD_REQUEST;
  }
}
