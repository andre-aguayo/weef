import path from 'path';
import fs from 'fs';
import { config } from 'dotenv';

const file = path.join(__dirname, '..', '..', '.env');

if (fs.existsSync(file)) {
  config({ path: file });
}

type Connection = 'postgres';
export enum AppMode {
  DEV = 'dev',
  PROD = 'prod',
  STAGING = 'staging',
  CI = 'ci',
}

const mode: Record<string, AppMode> = {
  production: AppMode.PROD,
  development: AppMode.DEV,
  staging: AppMode.STAGING,
  ci: AppMode.CI,
};

const configData = {
  api: {
    port: Number.parseInt(process.env.API_PORT, 10) || 3000,
    mode: mode[process.env.MODE] ? mode[process.env.MODE] : AppMode.DEV,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  },
  database: {
    connection: process.env.DATABASE_CONNECTION as Connection,
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: process.env.DATABASE_DATABASE,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: process.env.DATABASE_LOGGING,
    entities: process.env.DATABASE_ENTITIES,
    isSeeders: !!process.env.SEEDERS,
  },
};

export default configData;
