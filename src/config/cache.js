import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const { REDISCLOUD_URL } = process.env;
const isProduction = process.env.NODE_ENV === 'production';

export default isProduction ? redis.createClient(REDISCLOUD_URL) : redis.createClient();
