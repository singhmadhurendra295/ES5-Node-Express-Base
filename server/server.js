import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import swaggerify from '../swagger';
import routes from './routes';


const app = new Express();

export default class ExpressServer {
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
