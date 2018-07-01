import userServices from '../services/user.service';

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
}
export default new Controller();
