import * as dotenv from 'dotenv';
import * as path from 'path';
import Joi from 'joi';

const defaultEnv = 'development';

const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || defaultEnv}`);

dotenv.config({ path: envFilePath });

console.log(`Loaded environment variables from ${envFilePath}`);

const envsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default(defaultEnv).required(),
    PORT: Joi.number().default(5000),
    MONGO_URI: Joi.string().description('database url').default('mongodb://localhost:27017/dummydb'),
  })
  .unknown();

const { value: envs, error } = envsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envs.NODE_ENV,
  port: envs.PORT,
  mongoUri: envs.MONGO_URI,
  fifteenMins: 15 * 60 * 1000,
};
