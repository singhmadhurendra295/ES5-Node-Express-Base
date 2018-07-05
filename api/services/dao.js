const Models = require('../models');

class DAOServices{
    constructor(model){
        this.model = model; 
    }

    create(document,cb){
        this.model.create(document).then((user)=>{
            cb(null,user);
        }).catch((err) =>{
            cb(err);
        });
    }

    findOne(query,projections){
        return this.model.findOne(query,projections).exec();
    }

    updateOne(query,updateObj,options){
        return this.model.update(query,updateObj,options).exec();
    }
}
module.exports = DAOServices;