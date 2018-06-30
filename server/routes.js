import userRouter from '../api/users/router'

export default function routes(app) {
  app.use('/api/users', userRouter);
}