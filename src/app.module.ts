import { join } from 'path';
import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { TranslateModule } from './modules/common/translate/translate.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { TranslateService } from './modules/common/translate/translate.service';
import './language/pt/messages.json';
import './language/en/messages.json';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'pt',
      loaderOptions: {
        path: join(__dirname, '/language/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    TranslateModule,
    HealthCheckModule,
  ],
  providers: [TranslateService],
  controllers: [],
})
export class AppModule {}
