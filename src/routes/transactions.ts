import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import crypto from 'node:crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    });

    const { title, amount, type } = createTransactionBodySchema.parse(req.body);

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'debit' ? amount * -1 : amount
    });

    return res.status(201).send();
  });
}
