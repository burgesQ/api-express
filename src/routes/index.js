// index.js hold the routing logic

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
const {data} = require('../controller/data');

module.exports = (redis) => {
  data.use(redis);

  const router = express.Router();

  router.get('/data', data.getAll);
  router.get('/data/:id', data.get);
  router.delete('/data/:id', data.delete);
  router.post('/data', data.create);
  router.patch('/data/:id', data.update);

  router.use('/docs', swaggerUi.serve);
  router.get('/docs.json', (req, res) => {
    res.json(specs);
  });
  router.get('/docs', swaggerUi.setup(specs, {explorer: true}));

  return router;
};
