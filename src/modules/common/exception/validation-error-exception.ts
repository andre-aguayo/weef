import { ValidationError } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { TranslateFunction } from '../translate/translate.interface';

interface Errors {
  field: string;
  errors: string[];
}

export class ValidationErrorException extends HttpException {
  public errors: ValidationError[];

  constructor(validationErrors: ValidationError[]) {
    super(validationErrors, 422);
    this.errors = validationErrors;
  }

  public formatError(translate: TranslateFunction): Promise<Errors[]> {
    return Promise.all(
      this.errors.map(async (error) => {
        if (error.property && error.constraints) {
          return {
            field: error.property,
            errors: await ValidationErrorException.translateError(
              error.constraints,
              translate,
            ),
          };
        }
      }),
    );
  }

  public static translateError(
    constraints: Record<string, string>,
    translate: TranslateFunction,
  ): Promise<string[]> {
    const minMaxLength = async (
      key: string,
      value: string,
    ): Promise<string> => {
      const characters = value
        .replace(/(.*?)(to [0-9]+ characters)/g, '$2')
        .replace(/[^0-9]/g, '');
      return await translate(`messages.common.errors.${key}`, {
        characters,
      });
    };

    const transformError: Record<string, (value: string) => Promise<string>> = {
      minLength: (value: string) => minMaxLength('minLength', value),
      maxLength: (value: string) => minMaxLength('maxLength', value),
    };

    return Promise.all(
      [...Object.entries(constraints)].map(async ([key, value]) => {
        if (transformError[key]) {
          return transformError[key](value);
        }

        return await translate(`messages.common.errors.${key}`);
      }),
    );
  }
}
