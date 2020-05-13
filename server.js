const express = require('express');
// const path = require('path');                  -> ?
// const cookieParser = require('cookie-parser'); -> cookie store
// const bodyParser = require('body-parser');     -> input payloads
const logger = require('morgan');
// expose swagger API doc
const swaggerUi = require('swagger-ui-express');
// generate swagger API doc
const swaggerJSDoc = require('swagger-jsdoc');
// handle pretty query param
const pretty = require('express-prettify');
const Session = require('express-session');

const redis = require('./redis');
// credential routes
const credential = require('./routes/credential');
// swagger spec
const swaggerSpec = require('./swagger');

// server data
const { port } = require('./config');

const app = express();

// Initialize redis session
const session = Session({
  resave: true,
  saveUninitialized: true,
  key: 'SID',
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  secret: 'Luke Skywalker',
  store: redis.initializeRedis(Session),
});


// express conf
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
// redis session
app.use(session);
// expose pretty query param
app.use(pretty({ query: 'pretty' }));

// load credential endpoints
app.route('/api/credential').get(credential.getCredential);

// expose json swagger API doc
app.get('/api/docs.json', (req, res) => {
  res.json(swaggerSpec);
});
// expose html swagger API doc
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// hanlde 404 as json
app.use((req, res, next) => {
  res.status(404);
  res.json({ error: 'Not found' });
});

// return internal as json
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (app.get('env') == "production") {
    res.status(500).json({ error: 'Internal server error' });
  } else {
    res.status(500).json({ error: 'Internal server error', trace: err.stack });
  }
});

// start server
app.listen(port, () => {
  console.log(`listening on:\t${port}`);
});

module.exports = app;
