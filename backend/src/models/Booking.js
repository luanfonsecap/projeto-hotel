import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  sponsor: String,
  contact: Number,
  hotel: String,
  typeRoom: String,
  time: {
    entry: Date,
    exit: Date,
  },
  guest: Number,
},
{
  timestamps: true,
});

export default model('Booking', BookingSchema);
