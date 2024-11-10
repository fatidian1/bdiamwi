import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {User} from '@/entity/user';

const entities = [
  User,
];

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOSTNAME,
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.NODE_ENV != 'production',
  logging: false,
  entities,
  ssl: process.env.DATABASE_SSL == '1',
  subscribers: [],
});
export const getDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
export default AppDataSource;
