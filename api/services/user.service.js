const DAO = require('./dao.service');

class UserService {
    constructor() {}
  
    create(document) {
        return new Promise(function(reject,resolve){
            DAO.create(document,(err,user)=>{
                if(err) reject(err);
                resolve(user);
            });
        });
    }

    findUser(query,projections) {
        return DAO.findOne(query,projections);
    }
  }


  
module.exports = new UserService();
  