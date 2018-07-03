const express = require('express');
const controller = require('./controller');
const validation = require('./validation');
const auth = require('../middleware');

module.exports = express
  .Router()
  .post('/register',validation.create, controller.create)
  .post('/login',validation.login, controller.login)
  .post('/resetPassword',validation.resetPassword,auth.verifyJWT_MW, controller.resetPassword);
