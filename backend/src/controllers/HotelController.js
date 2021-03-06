/* eslint-disable class-methods-use-this */
import AppError from '../errors/AppError';

class HotelController {
  constructor(hotel) {
    this.Hotel = hotel;
  }

  async index() {
    const hotels = await this.Hotel.find();

    return hotels;
  }

  async show({ name }) {
    const hotel = await this.Hotel.findOne({ name });

    if (!hotel) {
      throw new AppError(400, 'This hotel does not exist');
    }

    return hotel;
  }

  async store({
    name, uf, city, street, quantity, dailyValue, image,
  }) {
    const hotelExist = await this.Hotel.findOne({ name });

    if (hotelExist) {
      throw new AppError(400, 'This hotel name is already recorded.');
    }

    const hotel = await this.Hotel.create({
      name,
      uf,
      city,
      street,
      apartaments: {
        quantity,
        dailyValue,
      },
      image,
    });

    return hotel;
  }

  async update({
    id, name, uf, city, street, quantity, dailyValue,
  }) {
    const hotel = await this.Hotel.findOneAndUpdate(
      { _id: id },
      {
        name, uf, city, street, apartaments: { quantity, dailyValue },
      },
    );

    if (!hotel) {
      throw new AppError(400, 'This hotel doest not exist');
    }

    return hotel;
  }

  async delete({ id }) {
    await this.Hotel.deleteOne({ id });
  }
}

export default HotelController;
