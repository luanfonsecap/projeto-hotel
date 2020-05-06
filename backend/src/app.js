import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes/index';

class App {
  constructor() {
    this.app = express();

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    // Utilizando conexão local com o mongoDB
    mongoose.connect('mongodb://127.0.0.1:27017/project_hotel');

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
