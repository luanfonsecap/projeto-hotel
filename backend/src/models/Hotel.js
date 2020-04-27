import { Schema, model } from 'mongoose';

const HotelSchema = new Schema({
  name: String,
  uf: String,
  city: String,
  street: String,
  quantityRooms: Number,
  dailyValue: Number,
},
{
  timestamps: true,
});

export default model('Hotel', HotelSchema);
