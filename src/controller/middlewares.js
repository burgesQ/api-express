// middlewares.js hold some useful middlware to force json error

const nodeEnv = require('../modules/config');

function notFound(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}

// eslint-disable-next-line no-unused-vars
function handleError(err, req, res, next) {
  const val = err.status || 500;
  let ret = {error: err.message};

  if (val !== 404) {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  }

  if (nodeEnv === 'dev') {
    ret = {ret, trace: err.statck};
  }

  res.status(val);
  res.json(ret);
}

module.exports = {
  handleError: () => handleError,
  notFound: () => notFound,
};
