import { Router } from 'express';

import SessionController from '../controllers/SessionController';
import BookingController from '../controllers/BookingController';
import User from '../models/User';
import Booking from '../models/Booking';
import Hotel from '../models/Hotel';

const sessionController = new SessionController(User);
const bookingController = new BookingController(Booking, User, Hotel);

const sessionsRouter = Router();

sessionsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await sessionController.show(id);

  return res.json(user);
});

sessionsRouter.post('/', async (req, res) => {
  const { name, email } = req.body;

  const user = await sessionController.store({ name, email });

  return res.json(user);
});

sessionsRouter.get('/:user_id/bookings', async (req, res) => {
  const id = req.params.user_id;

  const bookings = await bookingController.index({ id });

  // bookings.array.forEach(async (booking) => {
  //   await booking.populate('sponsor').populate('hotel').execPopulate();
  // });

  return res.json(bookings);
});

export default sessionsRouter;
