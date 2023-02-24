import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';
import { TranslateService } from '../common/translate/translate.service';

@Module({
  controllers: [HealthCheckController],
  providers: [TranslateService, HealthCheckService],
})
export class HealthCheckModule {}
