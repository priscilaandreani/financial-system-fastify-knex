import request from 'supertest';
import { app } from '../../src/app';
import { it, beforeAll, afterAll, describe, beforeEach } from 'vitest';
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

  it('should be able to delete a transaction', async () => {
    const createTransactionRes = await request(app.server)
      .post('/transactions')
      .send({
        title: 'burger',
        amount: 1300,
        type: 'credit'
      });

    const cookies = createTransactionRes.headers['set-cookie'];
    console.log(createTransactionRes);

    await request(app.server)
      .delete(`/transactions/${createTransactionRes}`)
      .set('Cookie', cookies);
    // .expect(204);
  });
});
