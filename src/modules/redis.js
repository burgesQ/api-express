// redis-client.js hold the redis connection

const Redis = require('ioredis');
const {redisAddr, redisPort} = require('./config');

let client = {};

function init() {
  client = new Redis({
    host: redisAddr,
    port: redisPort,
    maxRetriesPerRequest: 5,
  });
  return client;
}

// async / await
// client.set('key', 'value', (err, result) => {
//   if (!err) {
//     client.get('key', (e, r) => {
//       if (e) {
//         console.error(e);
//       } else {
//         console.log(r);
//       }
//     });
//   }
// });

// callback - ioredis returns a promise if the last argument isn't a function
// client.get('key').then((result) => {
//   console.log(result); // Prints "bar"
// });

module.exports.redis = {
  init,
};
