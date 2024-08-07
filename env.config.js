import env from 'env-var';

const envConfig = {
  db: env.get('DATABASE_URL').required().asString(),
  port: env.get('PORT').required().asPortNumber().default(3333),
  nodeEnv: env.get('NODE_ENV').required().asString().default('development')
};

export default envConfig;
