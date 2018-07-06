const { userServices } = require('../services/index');
const jwtToken = require('../../lib/auth');
const { EMAIL } = require('../../lib/constant');
const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require('../../lib/message');
const commonFunctions = require('../../lib/common');
const emailProvider = require('../../lib/email-provider');
const logger = require('../../lib/logger');
const mongoose = require('mongoose').Types;

//for reference
//https://blog.cloudboost.io/node-express-controller-inheritance-2d5b2661ee7d 

class UserController {
  
  constructor() {
    this.create = this.create.bind(this);
  }
  create() {
    console.log("Using parent class methos")
  }
}

class newController extends UserController {
  create() {
    console.log('i have overridden parent class create method.');
  }
}
const todoCtrl = new newController();
todoCtrl.create();


class Controller extends UserController {

  constructor() {
    super();
  }

  resSuccess() {

  }

  resError() {

  }

  async create(req, res) {
    try {
      let payload = req.body;
      let validateEmail = await commonFunctions.validateEmail(payload);
      if (validateEmail) {
        return res.send({ status: 0, code: 404, message: ERROR_MESSAGE.EMAIL_EXIST });
      }
      let user = await userServices.createUser(payload);
      res.send({ status: 1, code: 200, message: SUCCESS_MESSAGE.SUCCESS, data: user });
    } catch (err) {
      res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err });
    }
  }

  async login(req, res) {
    try {
      let payload = req.body;
      let user = await commonFunctions.validateEmail(payload);
      if (user) {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) return res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err.stack });
          if (!isMatch) return res.send({ status: 0, code: 404, message: ERROR_MESSAGE.INVALID_PWD });
          let { firstName, lastName, email, _id } = user;
          let token = jwtToken.createJWToken({
            sessionData: { firstName, lastName, email, _id },
            maxAge: 3600
          });
          logger.logResponse(req.id, res.statusCode, 200);
          res.send({ status: 1, code: 200, message: SUCCESS_MESSAGE.SUCCESS, token: token })
        });
      } else {
        res.send({ status: 0, code: 404, message: ERROR_MESSAGE.INVALID_EMAIL });
      }
    } catch (err) {
      res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err.stack });
    }
  }

  async resetPassword(req, res) {
    console.log("req.user", req.user);
    if (req.user) {
      let payload = req.body;
      let { _id, email } = req.user;
      payload.email = email;
      let user = await commonFunctions.validateEmail(payload);
      user.comparePassword(payload.oldPassword, async function (err, isMatch) {
        if (err) return res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err.stack });
        if (!isMatch) return res.send({ status: 0, code: 404, message: ERROR_MESSAGE.INVALID_OLD_PWD });
        try {
          let query = { _id: mongoose.ObjectId(_id) };
          let updateObj = {
            $set: { password: payload.newPassword }
          };
          let updatedUser = await userServices.updateUser(query, updateObj, { new: true });
          res.send({ status: 1, code: 200, message: SUCCESS_MESSAGE.SUCCESS, data: updatedUser });
        } catch (err) {
          res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err.stack });
        }

      });
    } else {
      res.send({ status: 0, code: 404, message: ERROR_MESSAGE.INVALID_AUTH });
    }
  }

  async forgotPassword(req, res) {
    try {
      let payload = req.body;
      let user = await commonFunctions.validateEmail(payload);
      if (user) {
        emailProvider.sendEmail(1, EMAIL.FORGOT_PWD.TYPE, user);
        res.send({ status: 1, code: 200, message: SUCCESS_MESSAGE.SUCCESS })
      } else {
        res.send({ status: 0, code: 404, message: ERROR_MESSAGE.INVALID_EMAIL });
      }
    } catch (err) {
      res.send({ status: 0, code: 404, message: ERROR_MESSAGE.ERROR, data: err.stack });
    }
  }

  async fileUpload(req, res) {
    var formidable = require('formidable');
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.send({ files: files });
    });
  }

  async userDetails() {

  }
}
module.exports = new Controller();
