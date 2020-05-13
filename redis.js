// redis.js
const redis = require('redis');
const connectRedis = require('connect-redis');

// server data
const { redisAddr, redisPort } = require('./config');

function initializeRedis(Session) {

  console.log(`redis address:\t${redisAddr}`);
  console.log(`redis port:\t${redisPort}`);

  const redisClient = redis.createClient({
    host: redisAddr, // or '127.0.0.1'.
    port: redisPort,
  });

  redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });

  const RedisStore = connectRedis(Session);
  return new RedisStore({ client: redisClient });
}

module.exports = { initializeRedis };
