import * as express from 'express';
import controller from './controller';
import validation from './validation';
import { verifyJWT_MW } from '../middleware'

export default express
  .Router()
  .post('/register',validation.create, controller.create)
  .post('/login', controller.login)
  .get('/:id',verifyJWT_MW, controller.userDetails);
