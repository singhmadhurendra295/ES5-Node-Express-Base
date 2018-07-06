const DAO = require('./dao');
const Models = require('../models');

class UserService extends DAO{
    constructor() {
        super(Models.users);
    }
  
    createUser(document) {
        return this.createOne(document);
    }

    findUser(query,projections) {
        return this.findOne(query,projections);
    }

    updateUser(query,updateObj,options){
        return this.updateOne(query,updateObj,options)
    }
  }


  
module.exports = new UserService();
  