const swaggerJSDoc = require('swagger-jsdoc');

// swagger doc
module.exports = {
  swaggerSpec: swaggerJSDoc({
    definition: {
      openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
      info: {
        title: 'TURN express', // Title (required)
        description: 'API server generating and storing TURN credentials',
        version: '1.0.0', // Version (required)
        contact: {
          name: 'Quentin Burgess',
          email: 'quentin.burgess@frafos.com',
        },
      },
    },
    // basePath: '/api',
    // Path to the API docs
    apis: [
      './routes/credential.js',
      './models/credential.js',
    ],
  }),
};
