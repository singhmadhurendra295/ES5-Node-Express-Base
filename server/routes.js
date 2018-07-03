const userRouter = require('../api/users/router');

module.exports = function routes(app) {
  app.use('/api/users', userRouter);
}