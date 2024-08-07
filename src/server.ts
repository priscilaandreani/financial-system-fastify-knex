import fastify from 'fastify';
import { knex } from './database';
import crypto from 'node:crypto';

const server = fastify();

server.get('/hello', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000
    })
    .returning('*');

  return transaction;
});

server
  .listen({
    port: process.env.PORT
  })
  .then(() => {
    console.log(`HTTP Server is running on port ${process.env.PORT}`);
  });
