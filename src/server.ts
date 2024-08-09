import { app } from './app';

app.listen(
  {
    port: process.env.PORT
  },
  (err, address) => {
    if (err) {
      console.error(err);
    }
    console.log(`Server listening at ${address}`);
  }
);
