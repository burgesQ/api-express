const express = require('express');
// const path = require('path');                  -> ?
// const cookieParser = require('cookie-parser'); -> cookie store
// const bodyParser = require('body-parser');     -> input payloads
const logger = require('morgan');
const credential = require('./routes/credential');

const port = process.env.PORT || 4242;
const app = express();

// express conf
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

// TODO: use cookieParser to save cred for connection
// app.use(cookieParser());

// load credentials endpoint
app.route('/credential').get(credential.getCredential);

// hanlde 404 as json
app.use((req, res, next) => {
  res.status(404);
  res.json({ error: 'Not found' });
});

// return internal instead of stack trace
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// start server
app.listen(port, () => {
  /* eslint no-console: 0 */
  console.log(`Running on :${port}`);
});

module.exports = app;
