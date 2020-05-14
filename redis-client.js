// redis-client.js hold the redis connection

// const redis = require('redis');
const { redisAddr } = require('./config');

// console.log(`redis:\ttrying ${redisAddr}...`);

// const retryStrategy = (options) => {
//   // retry forever, with a max retry delay of 5s
//   return Math.min(options.attempt * 100, 5000);
// };

// const redisClient = redis.createClient({
//   url: redisAddr,
//   retry_strategy: retryStrategy,
//   connect_timeout: 1000 * 5, // test 1min
// });

// function print(err, reply) {
//   console.log(`redis reply:\t${reply}`);
// }

// redisClient.on('error', (error) => { console.error(error); });
// redisClient.on('connect', () => { console.log('redis connected'); });

// redisClient.set('key', 'value', print);


const Redis = require('ioredis');
const redis = new Redis(redisAddr);

redis.set('key', 'value');
// ioredis supports the node.js callback style
redis.get('key',  (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

// Or ioredis returns a promise if the last argument isn't a function
redis.get('key').then((result) => {
  console.log(result); // Prints "bar"
});


module.exports.client = function() {
  return redis;
}


// const client = redis.createClient(redisAddr);

// client.on("connect", function() {
//   console.log(`connected to \t${redisAddr}`);
// })

// client.on("error", function(error) {
//   console.error(error);
// });


// module.export = {
//   client,
//   doRequest: function(client) {
//   },
// };
