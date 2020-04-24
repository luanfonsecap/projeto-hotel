import { Schema, model } from 'mongoose';

const HotelSchema = new Schema({
  name: String,
  uf: String,
  city: String,
  street: String,
  quantity_rooms: Number,
  daily_value: Number,
});

export default model('Hotel', HotelSchema);
