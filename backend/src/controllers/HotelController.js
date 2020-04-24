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
      throw new Error('This hotel does not exist');
    }

    return hotel;
  }

  async store({
    name, uf, city, street, quantityRoom, dailyValue,
  }) {
    const hotelExist = await this.Hotel.findOne({ name });

    if (hotelExist) {
      throw new Error('This hotel name is already recorded.');
    }

    const hotel = await this.Hotel.create({
      name,
      uf,
      city,
      street,
      quantityRoom,
      dailyValue,
    });

    return hotel;
  }

  async update({
    id, name, uf, city, street, quantityRoom, dailyValue,
  }) {
    const hotel = await this.Hotel.findOneAndUpdate(
      { id },
      {
        name, uf, city, street, quantityRoom, dailyValue,
      },
    );

    if (!hotel) {
      throw new Error('This hotel doest not exist');
    }

    return hotel;
  }

  async delete({ id }) {
    const hotel = this.Hotel.findOne({ id });

    if (!hotel) {
      throw new Error('This hotel doest not exist');
    }

    await this.Hotel.deleteOne({ id });
  }
}

export default HotelController;
