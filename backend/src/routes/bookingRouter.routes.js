import { Router } from 'express';
import { parseISO } from 'date-fns';

import BookingController from '../controllers/BookingController';
import UserController from '../controllers/UserController';
import Booking from '../models/Booking';
import User from '../models/User';
import Hotel from '../models/Hotel';
import AppError from '../errors/AppError';

const bookingController = new BookingController(Booking, User, Hotel);
const userController = new UserController(User);

const bookingRouter = new Router();

bookingRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const bookings = await bookingController.index(id);

  return res.json(bookings);
});

bookingRouter.get('/:id/bookings', async (req, res) => {
  const { userId } = req.headers;
  const { id } = req.params;

  const user = await userController.show(userId);

  if (user.profile === 'client') {
    if (!user._id === id) {
      throw new AppError(401, 'This bookings it is only available for the owner or admins');
    }
  }

  const bookings = await bookingController.show({ id });

  return res.json(bookings);
});

bookingRouter.post('/:hotelId', async (req, res) => {
  const {
    initialDate, hotel, finalDate, guest,
  } = req.body;
  const { userId } = req.headers;
  const { hotelId } = req.params;

  const user = await userController.show(userId);

  if (!user.profile === 'client') {
    throw new AppError(401, "Only client user's can do this operation.");
  }

  const initalFormattedDate = parseISO(initialDate);
  const finalFormattedDate = parseISO(finalDate);

  const booking = await bookingController.store({
    hotelId, userId, initalFormattedDate, hotel, finalFormattedDate, guest,
  });

  return res.status(201).json(booking);
});

bookingRouter.delete('/:id/booking', async (req, res) => {
  const { userId } = req.headers;
  const { id } = req.params;

  const user = await userController.show(userId);

  if (!user.profile === 'admin') {
    throw new AppError(401, "Only admin user's can do this operation.");
  }

  await bookingController.destroy(id);

  return res.status(204).send();
});


export default bookingRouter;
