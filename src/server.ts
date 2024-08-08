import fastify from 'fastify';
import { transactionsRoutes } from './routes/transactions';
import cookie from '@fastify/cookie';

const app = fastify();

app.register(cookie);

app.register(transactionsRoutes, {
  prefix: '/transactions'
});

app
  .listen({
    port: process.env.PORT
  })
  .then(() => {
    console.log(`HTTP Server is running on port ${process.env.PORT}`);
  });
