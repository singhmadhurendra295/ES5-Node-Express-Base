require('./server/env');
const Server = require('./server/server');
const routes = require('./server/routes');

new Server()
  .router(routes)
  .listen(process.env.PORT);

process.on('uncaughtException', function (err) {
  // handle the error safely
  console.log(err)
})
