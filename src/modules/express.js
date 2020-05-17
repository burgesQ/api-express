// express.js implement the express conf

const express = require('express');
const logger = require('morgan');
const pretty = require('express-prettify');
const routes = require('../routes');
const middlewares = require('../controller/middlewares');
const {nodeEnv, port} = require('./config');
const usedRedis = require('./redis.mock').mockRedis.init();
      // nodeEnv === 'test'
      // ? require('./redis.mock').mockRedis.init()
      // : require('./redis').redis.init();

const app = express();

// express conf
app.use(logger(nodeEnv));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(pretty({query: 'pretty'}));
app.use('/api/v1', routes(usedRedis));
app.use(middlewares.notFound());
app.use(middlewares.handleError());

module.exports = app;
