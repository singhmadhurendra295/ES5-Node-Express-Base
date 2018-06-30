import './server/env';
import Server from './server/server';
import routes from './server/routes';

export default new Server()
  .router(routes)
  .listen(process.env.PORT);

// process.on('uncaughtException', function (err) {
//   // handle the error safely
//   console.log(err)
// })