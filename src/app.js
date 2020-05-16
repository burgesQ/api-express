const express = require('express');
const logger = require('morgan');
const pretty = require('express-prettify');
const routes = require('./routes');
const middlewares = require('./routes/middlewares');
const { nodeEnv, port } = require('./config');
const { redis } = require('./client/redis');
const { mockRedis } = require('./client/redis.mock');

const app = express();
const usedRedis = (nodeEnv === 'test') ? mockRedis.init() : redis.init();

// express conf
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pretty({ query: 'pretty' }));
app.use('/api/v1', routes(usedRedis));
app.use(middlewares.notFound());
app.use(middlewares.handleError());

// start server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on:\t${port}`);
});

module.exports = app;
