import { Router } from 'express';
import { parseISO } from 'date-fns';

import BookingController from '../controllers/BookingController';
import Booking from '../models/Booking';

const bookingController = new BookingController(Booking);

const bookingRouter = new Router();

bookingRouter.post('/', async (req, res) => {
  const {
    sponsor, contact, hotel, typeRoom, time, guest,
  } = req.body;

  const formattedTime = {
    entry: parseISO(time.entry),
    exit: parseISO(time.exit),
  };

  const booking = await bookingController.store({
    sponsor, contact, hotel, typeRoom, time: formattedTime, guest,
  });

  return res.status(201).json(booking);
});

export default bookingRouter;
