import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import crypto from 'node:crypto';

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return res.status(401).send('Unauthorized.');
    }

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select('*');

    return { transactions };
  });

  app.get('/:id', async (req) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid()
    });

    const { id } = getTransactionParamsSchema.parse(req.params);

    const transaction = await knex('transactions')
      .select('*')
      .where('id', id)
      .first();

    return { transaction };
  });

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', {
        as: 'total ammount'
      })
      .first();

    return { summary };
  });

  app.post('/', async (req, res) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    });

    const { title, amount, type } = createTransactionBodySchema.parse(req.body);
    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
      const SEVEN_DAYS = 60 * 60 * 24 * 7;

      sessionId = crypto.randomUUID();

      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: SEVEN_DAYS
      });
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'debit' ? amount * -1 : amount,
      session_id: sessionId
    });

    return res.status(201).send();
  });
}
