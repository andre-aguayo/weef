import { join } from 'path';
import { I18nModule, I18nService } from 'nestjs-i18n';
import { Test, TestingModule } from '@nestjs/testing';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { TranslateService } from './modules/common/translate/translate.service';
import { ConfigService } from '@nestjs/config';

interface TestingModuleProps {
  providers: Provider[];
  imports?: any[];
  controllers?: any[];
  exports?: any[];
}

interface TestingModuleReturn {
  module: TestingModule;
  translate: TranslateService;
}

export const testingModule = async ({
  providers = [],
  imports = [],
  controllers = [],
  exports = [],
}: TestingModuleProps): Promise<TestingModuleReturn> => {
  let translate: TranslateService;

  const module = await Test.createTestingModule({
    imports: [
      I18nModule.forRoot({
        fallbackLanguage: 'pt',
        loaderOptions: {
          path: join(__dirname, '/language/'),
          watch: true,
        },
      }),
      ...imports,
    ],
    providers: [
      {
        provide: TranslateService,
        useFactory: async (
          i18nService: I18nService,
        ): Promise<TranslateService> => {
          translate = new TranslateService(null, i18nService);
          return translate;
        },
        inject: [I18nService],
      },
      ConfigService,
      ...providers,
    ],
    exports,
    controllers,
  }).compile();

  return {
    module,
    translate,
  };
};
