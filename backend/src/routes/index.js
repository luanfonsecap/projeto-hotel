import { Router } from 'express';

import AppError from '../errors/AppError';

import sessionsRouter from './sessionsRouter.routes';
import bookingRouter from './bookingRouter.routes';
import hotelsRouter from './hotelsRouter.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/bookings', bookingRouter);

routes.use('/hotels', hotelsRouter);

routes.use((err, req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default routes;
