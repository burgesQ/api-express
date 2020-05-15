// redis-client.js hold the redis connection

const Redis = require('ioredis');
const { redisAddr, redisPort } = require('../config');

const client = new Redis({
  host: redisAddr,
  port: redisPort,
  maxRetriesPerRequest: 5,
});


// async / await
client.set('key', 'value', (err, result) => {
  if (!err) {
    client.get('key', (e, r) => {
      if (e) {
        console.error(e);
      } else {
        console.log(r);
      }
    });
  }
});

// callback
// Or ioredis returns a promise if the last argument isn't a function
// client.get('key').then((result) => {
//   console.log(result); // Prints "bar"
// });

module.exports.redis = {
  ...client,
  get: client.get.bind(client),
  set: client.set.bind(client),
};
