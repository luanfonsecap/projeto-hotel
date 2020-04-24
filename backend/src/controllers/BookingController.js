class BookingController {
  constructor(booking) {
    this.Booking = booking;
  }

  async store({
    sponsor, contact, hotel, typeRoom, time, guest,
  }) {
    const booking = await this.Booking.create({
      sponsor, contact, hotel, typeRoom, time, guest,
    });

    return booking;
  }
}

export default BookingController;
