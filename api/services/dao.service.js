import Models from '../models';

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
}

export default new DAOServices();