import { Schema, model } from 'mongoose';

const HotelSchema = new Schema({
  name: String,
  uf: String,
  city: String,
  street: String,
  apartaments: {
    quantity: Number,
    dailyValue: Number,
  },
  image: String,
},
{
  toJSON: { virtuals: true },
  timestamps: true,
});

HotelSchema.virtual('image_url').get(() => `http://localhost:3333/uploads/${this.image}`);

export default model('Hotel', HotelSchema);
