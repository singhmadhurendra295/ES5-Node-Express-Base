const Joi = require('joi');

class UserValidations{
    constructor(){}

    create(req,res,next){
        console.log("interceptor running",req.body);
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName:Joi.string().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            email: Joi.string().email()
        }); 
        Joi.validate(req.body, schema, function (err, value) {
            if(err){
                res.json({err:err});
            }else{
                next();
            }
         });        
    }

    login(req,res,next){
        console.log("interceptor running",req.body);
        const schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email()
        }); 
        Joi.validate(req.body, schema, function (err, value) {
            if(err){
                res.json({err:err});
            }else{
                next();
            }
        });        
    }

    resetPassword(req,res,next){
        console.log("interceptor running",req.body);
        const schema = Joi.object().keys({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required()
        }); 
        Joi.validate(req.body, schema, function (err, value) {
            if(err){
                res.json({err:err});
            }else{
                next();
            }
        });        
    }
}

module.exports = new UserValidations();