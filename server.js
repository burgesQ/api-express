const express = require('express');
// const path = require('path');                  -> ?
// const cookieParser = require('cookie-parser'); -> cookie store
// const bodyParser = require('body-parser');     -> input payloads
const logger = require('morgan');
const credential = require('./routes/credential');
// expose swagger API doc
const swaggerUi = require('swagger-ui-express');

// generate swagger API doc
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'TURN express', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['./routes/credential.js'],
};
const swaggerSpec = swaggerJSDoc(options);

const port = process.env.PORT || 4242;
const app = express();

// express conf
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

// load credentials endpoint
app.route('/api/credential').get(credential.getCredential);

// expose the api doc json
app.get('/api/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// expose API doc html

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
