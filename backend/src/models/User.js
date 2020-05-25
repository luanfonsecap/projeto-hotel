import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  bookings: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
  },
  profile: String,
});

export default model('User', UserSchema);
