import { Router } from 'express';

import HotelController from '../controllers/HotelController';
import Hotel from '../models/Hotel';

const hotelController = new HotelController(Hotel);

const hotelsRouter = new Router();

hotelsRouter.get('/', async (req, res) => {
  const hotels = await hotelController.index();

  return res.json(hotels);
});

hotelsRouter.get('/:name', async (req, res) => {
  const { name } = req.params;

  const hotel = await hotelController.show({ name });

  return res.json(hotel);
});

hotelsRouter.post('/', async (req, res) => {
  const {
    name, uf, city, street, quantity, dailyValue,
  } = req.body;

  const hotel = await hotelController.store({
    name, uf, city, street, quantity, dailyValue,
  });

  return res.json(hotel);
});

hotelsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name, uf, city, street, quantityRoom, dailyValue,
  } = req.body;

  const hotel = await hotelController.update({
    id,
    name,
    uf,
    city,
    street,
    quantityRoom,
    dailyValue,
  });

  return res.json(hotel);
});

hotelsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await hotelController.delete({ id });

  return res.status(204).send();
});

export default hotelsRouter;
