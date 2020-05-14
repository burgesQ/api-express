// index.js hold the routing logic

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const credential = require('./credential');
const specs = require('./swagger');

function init(router = express.Router()) {
  router.get('/credential', credential.get);
  router.use('/docs', swaggerUi.serve);
  router.get('/docs.json', (req, res) => {
    res.json(specs);
  });
  router.get('/docs', swaggerUi.setup(specs, { explorer: true }));

  return router;
}

module.exports = init;
