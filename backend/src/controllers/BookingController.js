import * as Yup from 'yup';
import AppError from '../errors/AppError';

class BookingController {
  constructor(booking, user, hotel) {
    this.Booking = booking;
    this.User = user;
    this.Hotel = hotel;
  }

  async index({ id }) {
    const bookings = await this.Booking.find({ sponsor: id });

    return bookings;
  }

  async show({ id }) {
    const booking = await this.Booking.find({ sponsor: id });

    return booking;
  }

  async store({
    hotelId, userId, initialDate, finalDate, guest,
  }) {
    const schema = Yup.object().shape({
      hotelId: Yup.string().required(),
      userId: Yup.string().required(),
      initialDate: Yup.date().required(),
      finalDate: Yup.date().required(),
      guest: Yup.number().required().min(1),
    });

    try {
      schema.validate({
        hotelId, userId, initialDate, finalDate, guest,
      });
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        throw new AppError('Invalid data.');
      }
    }

    this.User.findById(userId).catch(() => {
      throw new AppError(401, 'User unauthorized.');
    });

    this.Hotel.findById(hotelId).catch(() => {
      throw new AppError(400, 'Hotel not found with this id.');
    });

    const booking = await this.Booking.create({
      sponsor: userId, hotel: hotelId, initialDate, finalDate, guest,
    });
    await booking.populate('sponsor').populate('hotel').execPopulate();

    return booking;
  }

  async destroy({ id }) {
    await this.Booking.deleteOne(id);
  }
}

export default BookingController;
