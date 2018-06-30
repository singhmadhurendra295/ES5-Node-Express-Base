import * as express from 'express';
import controller from './controller';
import validation from './validation';

export default express
  .Router()
  .post('/register',validation.create, controller.create)
  //.get('/', controller.all)
  //.get('/:id', controller.byId);
