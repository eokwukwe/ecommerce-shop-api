import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const { REDIS_URL } = process.env;
const isProduction = process.env.NODE_ENV === 'production';

export default isProduction ? redis.createClient(REDIS_URL) : redis.createClient();
