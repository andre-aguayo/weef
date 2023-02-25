import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidationErrorException } from './validation-error-exception';
import config, { AppMode } from '../../../config/config';
import { TranslateFunction } from '../translate/translate.interface';
import { Exception } from './exception';

@Catch(Error)
export class HttpFilterException implements ExceptionFilter {
  private readonly logger = new Logger(HttpFilterException.name);

  constructor(private readonly i18n: I18nService) {}

  public async renderError(
    response: Response,
    exception: any,
    statusCode: number = HttpStatus.BAD_REQUEST,
    translate: TranslateFunction,
  ): Promise<void> {
    let message = exception;
    let stackTracer = exception.stack || null;
    let currentStatusCode = statusCode;

    if (exception instanceof Exception) {
      message = await translate(exception.message);
      currentStatusCode = exception.statusCode;
    }

    if (exception instanceof EntityNotFoundError) {
      currentStatusCode = HttpStatus.NOT_FOUND;
      message = exception.message;
    }

    if (exception instanceof HttpException) {
      currentStatusCode = exception.getStatus();
      message = exception.getResponse();
    }

    if (stackTracer) {
      stackTracer = stackTracer.split('\n').map((item) => item.trim());
    }

    if (config.api.mode === AppMode.DEV) {
      response.status(currentStatusCode).json({
        message,
        stackTracer,
        context: exception?.context || null,
      });
      return;
    }

    response.status(currentStatusCode).json({
      message,
    });
  }

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(exception);

    const translate: TranslateFunction = (key, args) =>
      this.i18n.t(key, {
        lang: request.headers['accept-language'],
        args,
      });

    if (exception instanceof ValidationErrorException) {
      await this.renderError(
        response,
        await exception.formatError(translate),
        HttpStatus.UNPROCESSABLE_ENTITY,
        translate,
      );
      return;
    }

    if (exception instanceof NotFoundException) {
      await this.renderError(
        response,
        exception.message,
        HttpStatus.NOT_FOUND,
        translate,
      );
      return;
    }

    if (exception instanceof Exception) {
      await this.renderError(
        response,
        await translate(exception.message),
        exception.statusCode,
        translate,
      );
      return;
    }

    const message =
      config.api.mode === AppMode.DEV
        ? exception
        : await translate('messages.common.errors.unexpected');
    await this.renderError(
      response,
      message,
      HttpStatus.BAD_REQUEST,
      translate,
    );
  }
}
