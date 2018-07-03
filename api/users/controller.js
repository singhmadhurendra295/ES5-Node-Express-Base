import userServices from '../services/user.service';
import { createJWToken } from '../../lib/auth'

export class Controller {

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
      let user = await userServices.findUser(query);
      if(user){
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            console.log('Password123:', isMatch); //Password123: true
        });  
        let token = createJWToken({
          sessionData: user,
          maxAge: 3600
        });
        res.send({token:token})
      }
    }catch(err){

    }
  }
}
export default new Controller();
