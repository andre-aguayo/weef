import { Inject, Injectable, Scope } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { TranslateOptions } from 'nestjs-i18n/dist/services/i18n.service';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class TranslateService {
  private lang: string;

  constructor(
    @Inject(REQUEST) private readonly req: any,
    private readonly i18nService: I18nService,
  ) {}

  public setLang(lang: string): void {
    this.lang = lang;
  }

  public translate(key: string, options?: TranslateOptions): any {
    if (this.req) {
      options = {
        ...options,
        lang:
          !this.req.i18nLang && this.req.context
            ? this.req.context.i18nLang
            : this.req.i18nLang,
      };
    }

    if (this.lang) {
      options = {
        ...options,
        lang: this.lang,
      };
    }

    return this.i18nService.translate<any>(key, options);
  }

  public t<T = any>(key: string, options?: TranslateOptions): T {
    return this.translate(key, options);
  }
}
