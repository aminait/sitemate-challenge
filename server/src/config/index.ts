import * as dotenv from 'dotenv';
import * as path from 'path';

const defaultEnv = 'development';

const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || defaultEnv}`);

dotenv.config({ path: envFilePath });

console.log(`Loaded environment variables from ${envFilePath}`);
