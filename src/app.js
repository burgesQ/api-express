// app.js hold the main process

const app = require('./modules/express');
const { port } = require('./modules/config');

// start server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on:\t${port}`);
});

module.exports = app;
