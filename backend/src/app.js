import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

class App {
  constructor() {
    this.app = express();

    mongoose.connect('mongodb+srv://admin:admin@cluster0-rcqba.mongodb.net/test?retryWrites=true&w=majority',
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
