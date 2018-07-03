const Express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
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
    routes(app);
    app.use(Express.static(`${root}/public`));
  }

  router(routes) {
    swaggerify(app, routes);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => console.log(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
module.exports = ExpressServer;
