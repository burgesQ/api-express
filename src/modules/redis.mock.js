// redis.test.js implemtend a mocked redis interface

const Redis = require('ioredis-mock');
const {redisAddr, redisPort} = require('./config');

let client = {};

function initData() {
  // bug hset - won't supprot variadic key:value
  // https://github.com/luin/ioredis/issues/1039
  client.hset('test', 'some_string', 'someContent');
  client.hset('test', 'some_int', 1);
  client.hset('test', 'id', 'test');
};

client.initData = initData.bind(client);

function init() {
  client = new Redis({
    host: redisAddr,
    port: redisPort + 1,
    maxRetriesPerRequest: 5,
    data: {},
  });

  initData();

  return client;
};

module.exports.mockRedis = {
  init,
  initData: initData.bind(client),
};
