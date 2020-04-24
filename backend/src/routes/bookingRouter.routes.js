import { Router } from 'express';

import BookingController from '../controllers/BookingController';
import Booking from '../models/Booking';

const bookingController = new BookingController(Booking);

const bookingRouter = new Router();

bookingRouter.post('/booking', async (req, res) => {
  const {
    sponsor, contact, hotel, typeRoom, time, guest,
  } = req.body;

  const booking = await bookingController.store({
    sponsor, contact, hotel, typeRoom, time, guest,
  });

  return res.json(booking);
});

export default bookingRouter;
