import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  sponsor: { type: Schema.Types.ObjectId, ref: 'User' },
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
  initialDate: Date,
  finalDate: Date,
  guest: Number,
});

export default model('Booking', BookingSchema);
