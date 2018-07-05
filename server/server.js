const Express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const helmet = require('helmet');
const os = require('os');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const swaggerify = require('../swagger');
const routes = require('./routes');

const app = new Express();

class ExpressServer {
  constructor() {
    mongoose.connect('mongodb://localhost/Factis').then(res => console.log("dn connected"));;
    mongoose.set('debug', true);
    const root = path.normalize(`${__dirname}/..`);
    console.log(routes);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(session({
      secret:process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true}));
    //require('./passport')(app);
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });    
    app.use(helmet());    
    app.use(Express.static(`${root}/public`));
    app.use(function(err, req, res, next) {      
      if(String(err.name) === "ValidationError"){
        console.error(err.stack)
      }else{
        next(err);
      }      
    });
  }

  router(routes) {
    routes(app);
    swaggerify(app, routes);
    return this;
  }
  
  logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => console.log(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
module.exports = ExpressServer;
