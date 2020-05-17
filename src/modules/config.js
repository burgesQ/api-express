// config.js
const dotenv = require('dotenv');

dotenv.config();

const cfg = {
  redisAddr: process.env.REDIS_ADDR || '127.0.0.1',
  redisPort: process.env.REDIS_PORT || '6379',
  port: process.env.PORT || 4242,
  nodeEnv: process.env.NODE_ENV || 'prod',
};

// assign custom port for testing
if (cfg.nodeEnv === 'test') {
  cfg.port = 4243;
  cfg.redisPort = 6380;
}

module.exports = cfg;
