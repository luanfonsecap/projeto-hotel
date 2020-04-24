import { Router } from 'express';

import AppError from '../errors/AppError';

import sessionsRouter from './sessionsRouter.routes';
import bookingRouter from './bookingRouter.routes';
import hotelsRouter from './hotelsRouter.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/booking', bookingRouter);

routes.use('/hotels', hotelsRouter);

routes.user((err, req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: 'OK',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default routes;
