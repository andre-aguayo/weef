import { join } from 'path';
import config from './config/config';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';
import { JwtAuthGuard } from './modules/user/guards/auth.guard';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TranslateModule } from './modules/common/translate/translate.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { HttpFilterException } from './modules/common/exception/http-filter-exception';
import './language/pt/messages.json';
import './language/en/messages.json';

const connection: TypeOrmModuleOptions = {
  type: config.database.connection,
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  entities: [],
  synchronize: false,
  autoLoadEntities: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(connection),
    I18nModule.forRoot({
      fallbackLanguage: 'pt',
      loaderOptions: {
        path: join(__dirname, '/language/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    UserModule,
    EventModule,
    TranslateModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpFilterException,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
