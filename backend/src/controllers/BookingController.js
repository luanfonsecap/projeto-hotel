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
}

export default BookingController;
