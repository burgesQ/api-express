// redis.test.js implemtend a mocked redis interface

const Redis = require('ioredis-mock');
const {redisAddr, redisPort} = require('../config');

let client = {};

function init() {
  client = new Redis({
    host: redisAddr,
    port: redisPort + 1,
    maxRetriesPerRequest: 5,
    data: {},
  });

  // bug hset - won't supprot variadic key:value
  // https://github.com/luin/ioredis/issues/1039
  client.hset('test', 'data', 'test_value');
  client.hset('test', 'id', 'test');

  return client;
}

module.exports.mockRedis = {
  init,
};
