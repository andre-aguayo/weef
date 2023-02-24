import { Injectable } from '@nestjs/common';
import { TranslateService } from '../common/translate/translate.service';

@Injectable()
export class HealthCheckService {
  constructor(private readonly translateService: TranslateService) {}

  get(): Promise<string> {
    return this.translateService.t('messages.healthCheck');
  }
}
