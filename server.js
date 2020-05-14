const express = require('express');
const logger = require('morgan');
const pretty = require('express-prettify');
const Session = require('express-session');
//const redis = require('./redis');
const routes = require('./routes');

// server data
const { port, nodeEnv } = require('./config');

const app = express();
//const session = Session({
//   resave: true,
//   saveUninitialized: true,
//   key: 'SID',
//   cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
//   secret: 'Luke Skywalker',
//   store: redis.initializeRedis(Session),
// });

// express conf
//app.use(session);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
// expose pretty query param
app.use(pretty({ query: 'pretty' }));

app.use('/api/v1', routes.router);

// hanlde 404 as json
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle error
app.use((err, req, res, next) => {
  const val = err.status || 500

  res.status(val);

  if (val !== 404) {
    console.error(err.stack);
  }

  if (nodeEnv === 'development') {
    res.json({
      error: err.message,
      trace: err.stack,
    });
  } else {
    res.json({
      error: err.message,
    });
  }
});

// start server
app.listen(port, () => {
  console.log(`listening on:\t${port}`);
});

module.exports = app;
