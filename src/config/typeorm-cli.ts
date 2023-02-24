import { DataSource } from 'typeorm';
import config from './config';

const migrationPaths = !config.database.isSeeders
  ? [`${__dirname}/../migrations/*.ts`]
  : [`${__dirname}/../seeders/*.ts`];

export const AppDataSource = new DataSource({
  type: config.database.connection,
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  entities: [`${__dirname}/../modules/**/*.entity.ts`],
  migrations: migrationPaths,
  migrationsRun: false,
  synchronize: false,
  logging: true,
});
