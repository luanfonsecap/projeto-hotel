import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  sponsor: String,
  contact: Number,
  hotel: String,
  typeRoom: String,
  time: Date,
  guest: Number,
});

export default model('Booking', BookingSchema);
