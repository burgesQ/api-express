// index.js hold the routing logic

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const getCredential = require('./credential');
const specs = require('./swagger');

const router = express.Router();

router.get('/credential', getCredential);

router.use('/docs', swaggerUi.serve);
router.get('/docs.json', (req, res) => {
  res.json(specs);
});
router.get('/docs',
           swaggerUi.setup(specs, {
             explorer: true,
           }));

module.exports = { router };
