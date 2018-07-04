const userServices = require('../services/user.service');
const jwtToken = require('../../lib/auth');
const {CONSTANTS} = require('../../lib/constant');
const {SUCCESS_MESSAGE,ERROR_MESSAGE} = require('../../lib/message');

class Controller {

  async create(req, res) {
    console.log(req.body);
    try{
      let user = await userServices.create(req.body);
      console.log(user);
      res.send(user);
    }catch(err){
      res.send(err);
    }
  }

  async login(req,res){
    try{
      let query = {email:req.body.email};
      let projection = {firstName:1,lastName:1,email:1,password:1}
      let user = await userServices.findUser(query,projection,{lean:true});      
      if(user){
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            let {firstName,lastName,email,_id} = user;
            let token =jwtToken.createJWToken({
              sessionData: {firstName,lastName,email,_id},
              maxAge: 3600
            });
            res.send({token:token})
        });       
      }else {
        res.send({ message: ERROR_MESSAGE.INVALID_EMAIL});
      }
    }catch(err){
      res.send(err);
    }
  }

  async resetPassword(req,res){
    console.log("req.user",req.user);
    if(req.user){
      res.send({data:req.user});
    }else{
      res.send({message:"User not found."});
    }
  }
}
module.exports =  new Controller();
