import { knex as knexSetup, Knex } from 'knex';

console.log('process.env', process.env.DATABASE_URL);

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: process.env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './tmp/migrations'
  }
};

export const knex = knexSetup(config);
