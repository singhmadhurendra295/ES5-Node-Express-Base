const Models = require('../models');

class DAOServices{
    constructor(){}

    create(document,cb){
        Models.users.create(document,(err,user)=>{
            if(err){
                cb(err);
            }else{
                cb(null,user);
            }
        });
    }

    findOne(query,projections){
        return Models.users.findOne(query,projections).exec();
    }
}

module.exports = new DAOServices();