const DAO = require('./dao');
const Models = require('../models');

class UserService {
    constructor() {}
  
    create(document) {
        return new Promise(function(reject,resolve){
            new DAO(Models.users).create(document,(err,user)=>{
                if(err) reject(err);
                resolve(user);
            });
        });
    }

    findUser(query,projections) {
        //return DAO.findOne(query,projections);
        return new DAO(Models.users).findOne(query,projections);
    }

    updateUser(query,updateObj,options){
        return new DAO(Models.users).updateOne(query,updateObj,options)
    }
  }


  
module.exports = new UserService();
  