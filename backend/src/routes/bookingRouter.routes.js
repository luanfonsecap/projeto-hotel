import { Router } from 'express';
import { parseISO } from 'date-fns';

import BookingController from '../controllers/BookingController';
import Booking from '../models/Booking';
import User from '../models/User';
import Hotel from '../models/Hotel';

const bookingController = new BookingController(Booking, User, Hotel);

const bookingRouter = new Router();

bookingRouter.post('/:hotelId', async (req, res) => {
  const {
    initialDate, hotel, finalDate, guest,
  } = req.body;
  const { userId } = req.headers;
  const { hotelId } = req.params;

  const initalFormattedDate = parseISO(initialDate);
  const finalFormattedDate = parseISO(finalDate);

  const booking = await bookingController.store({
    hotelId, userId, initalFormattedDate, hotel, finalFormattedDate, guest,
  });

  return res.status(201).json(booking);
});

bookingRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const bookings = await bookingController.index(id);

  return res.json(bookings);
});

export default bookingRouter;
