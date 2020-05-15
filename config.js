// config.js
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  redisAddr: process.env.REDIS_ADDR || '127.0.0.1',
  redisPort: process.env.REDIS_PORT || '6379',

  port: process.env.PORT || 4242,
  nodeEnv: process.env.NODE_ENV || 'production',
};
