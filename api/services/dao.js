const Models = require('../models');

class DAOServices{
    constructor(model){
        this.model = model; 
    }

    async createOne(document){
        return await this.model.create(document);
    }

    findOne(query,projections){
        return this.model.findOne(query,projections).exec();
    }

    updateOne(query,updateObj,options){
        return this.model.update(query,updateObj,options).exec();
    }
}
module.exports = DAOServices;