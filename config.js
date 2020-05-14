// config.js
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  redisAddr: process.env.REDIS_ADDR || 'localhost:6379',
  port: process.env.PORT || 4242,
  nodeEnv: process.env.NODE_ENV || 'production',
};
