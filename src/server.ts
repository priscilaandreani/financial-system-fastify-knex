import fastify from 'fastify';
import { transactionsRoutes } from './routes/transactions';

const app = fastify();

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
