// middlewares.js hold some useful middlware to force json error

const nodeEnv = require('../config');

function notFound(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function handleError(err, req, res, next) {
  const val = err.status || 500;
  let ret = { error: err.message };

  if (val !== 404) {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  }

  if (nodeEnv === 'development') {
    ret = { ret, trace: err.statck };
  }

  res.status(val);
  res.json(ret);
}

module.exports = {
  handleError: () => handleError,
  notFound: () => notFound,
};