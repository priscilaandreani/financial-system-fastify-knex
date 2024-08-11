import request from 'supertest';
import { app } from '../../src/app';
import { it, beforeAll, afterAll, describe, beforeEach, expect } from 'vitest';
import { execSync } from 'child_process';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

beforeEach(() => {
  execSync('npm run knex migrate:rollback --all');
  execSync('npm run knex migrate:latest');
});

describe('Transactions routes', () => {
  it('should be able to create a transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'burger',
        amount: 1300,
        type: 'credit'
      })
      .expect(201);
  });

  it('should be able to get all transactions', async () => {
    const createTransactionRes = await request(app.server)
      .post('/transactions')
      .send({
        title: 'burger',
        amount: 1300,
        type: 'credit'
      });

    const cookies = createTransactionRes.headers['set-cookie'];

    await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);
  });

  it('should be able to get a transaction by id', async () => {
    const createTransactionRes = await request(app.server)
      .post('/transactions')
      .send({
        title: 'burger',
        amount: 1300,
        type: 'credit'
      });

    const cookies = createTransactionRes.headers['set-cookie'];

    const transactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies);

    const transactionId = transactions.body.transactions[0].id;

    await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200);
  });

  it('should be able to delete a transaction', async () => {
    const createTransactionRes = await request(app.server)
      .post('/transactions')
      .send({
        title: 'burger',
        amount: 1300,
        type: 'credit'
      });

    const cookies = createTransactionRes.headers['set-cookie'];

    const transactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies);

    const transactionId = transactions.body.transactions[0].id;

    await request(app.server)
      .delete(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(204);
  });

  it('should be able to get summary', async () => {
    const createCreditTransactionRes = await request(app.server)
      .post('/transactions')
      .send({
        title: 'salary',
        amount: 1300,
        type: 'credit'
      });

    const cookies = createCreditTransactionRes.headers['set-cookie'];

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'burger',
        amount: 50,
        type: 'debit'
      });

    const summaryRes = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies);

    expect(summaryRes.body).toEqual({
      summary: {
        total: 1250
      }
    });
  });
});
