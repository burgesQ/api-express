// index.js hold the routing logic

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
const { credential } = require('../controller/credential');

module.exports = (redis) => {
  credential.use(redis);

  const router = express.Router();
  router.get('/credential', credential.get);
  router.use('/docs', swaggerUi.serve);
  router.get('/docs.json', (req, res) => {
    res.json(specs);
  });
  router.get('/docs', swaggerUi.setup(specs, { explorer: true }));

  return router;
};
