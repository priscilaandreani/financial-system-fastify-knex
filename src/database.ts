import { knex as knexSetup, Knex } from 'knex';

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './tmp/sqlite.db'
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './tmp/migrations'
  }
};

export const knex = knexSetup(config);
