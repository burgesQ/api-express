const express = require('express');
const logger = require('morgan');
const pretty = require('express-prettify');
const routes = require('./routes');
const middlewares = require('./routes/middlewares');
const { port } = require('./config');

const app = express();

// express conf
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pretty({ query: 'pretty' }));
app.use('/api/v1', routes());
app.use(middlewares.notFound());
app.use(middlewares.handleError());

// start server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on:\t${port}`);
});

module.exports = app;
