import { knex as knexSetup, Knex } from 'knex';

//https://knexjs.org/guide/#configuration-options
export const config: Knex.Config = {
  client: process.env.DATABASE_CLIENT,
  connection:
    process.env.DATABASE_CLIENT === 'pg'
      ? process.env.DATABASE_URL
      : {
          filename: process.env.DATABASE_URL
        },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './tmp/migrations'
  }
};

export const knex = knexSetup(config);
