// index.js hold the routing logic

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('../modules/swagger');
const Data = require('../controller/data');
const { nodeEnv } = require('../modules/config');

module.exports = (redis) => {


  const router = express.Router();

  const data = new Data(redis);

  router
    .get('/data', data.getAll)
    .get('/data/:id', data.get)
    .delete('/data/:id', data.delete)
    .post('/data', data.create)
    .patch('/data/:id', data.update);

  if (nodeEnv !== 'test') {
    router.use('/docs', swaggerUi.serve);
    router.get('/docs.json', (req, res) => {
      res.json(specs);
    });
    router.get('/docs', swaggerUi.setup(specs, {explorer: true}));
  }

  return router;
};
