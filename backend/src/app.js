import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

class App {
  constructor() {
    this.app = express();

    mongoose.connect('mongodb://127.0.0.1:27017/project_hotel',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
