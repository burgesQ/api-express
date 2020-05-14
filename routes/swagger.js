const swaggerJSDoc = require('swagger-jsdoc');

// swagger doc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TURN express',
      description: 'API server generating and storing TURN credentials',
      version: '1.0.0',
      contact: {
        name: 'Quentin Burgess',
        email: 'quentin.burgess@frafos.com',
      },
    },
    servers: [{ url: `http://localhost:4242/api/v1` }],
  },
  apis: ['./routes/credential.js'],
};

const specs = swaggerJSDoc(options);

module.exports = specs;
