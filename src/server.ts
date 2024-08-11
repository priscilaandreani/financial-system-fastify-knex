import { app } from './app';

app.listen(
  {
    port: process.env.PORT,
    host: '0.0.0.0'
  },
  (err, address) => {
    if (err) {
      console.error(err);
    }
    console.log(`Server listening at ${address}`);
  }
);
