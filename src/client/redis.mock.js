// redis.test.js implemtend a mocked redis interface

const Redis = require('ioredis-mock');
const { redisAddr, redisPort } = require('../config');

let client = {};

function init() {

  client = new Redis({
    host: redisAddr,
    port: redisPort + 1,
    maxRetriesPerRequest: 5,
    data: {},
  });

  client.hset('test', 'data', 'test_value', (err, res) => {
    if (err) {
      console.error(`hsetting : ${err}`);
    } else {
      console.error(`hsetting done ${res}`);
    }
  });
  client.hset('test', 'id', 'test', (err, res) => {
    if (err) {
      console.error(`hsetting : ${err}`);
    } else {
      console.error(`hsetting done ${res}`);
    }
  });

  console.log('mocked redis loaded');
  return client;
}

module.exports.mockRedis = {
  init: init,
};
