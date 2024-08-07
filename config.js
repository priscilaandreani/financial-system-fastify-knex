import env from 'env-var';

const config = {
  db: env.get('DATABASE_URL').required().asString()
};

export default config;
