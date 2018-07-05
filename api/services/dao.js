const Models = require('../models');

class DAOServices{
    constructor(model){
        this.model = model; 
    }

    create(document,cb){
        this.model.create(document,(err,user)=>{
            if(err){
                cb(err);
            }else{
                cb(null,user);
            }
        });
    }

    findOne(query,projections){
        return this.model.findOne(query,projections).exec();
    }

    updateOne(model,query,updateObj,options){
        return this.model.findOneAndUpdate(query,updateObj,options).exec();
    }
}
module.exports = DAOServices;