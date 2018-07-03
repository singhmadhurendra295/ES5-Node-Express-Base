import DAO from './dao.service';

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

    findUser(query) {
        DAO.findOne(query);
    }
  }


  
  export default new UserService();
  