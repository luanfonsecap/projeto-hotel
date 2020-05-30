import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import HotelController from '../controllers/HotelController';
import UserController from '../controllers/UserController';
import Hotel from '../models/Hotel';
import User from '../models/User';
import AppError from '../errors/AppError';

const hotelController = new HotelController(Hotel);
const userController = new UserController(User);

const hotelsRouter = new Router();

const upload = multer(uploadConfig);

hotelsRouter.get('/', async (req, res) => {
  const hotels = await hotelController.index();

  return res.json(hotels);
});

hotelsRouter.get('/:name', async (req, res) => {
  const { name } = req.params;

  const hotel = await hotelController.show({ name });

  return res.json(hotel);
});

hotelsRouter.post('/', upload.single('image'), async (req, res) => {
  const { id } = req.headers;
  const {
    name, uf, city, street, quantity, dailyValue,
  } = req.body;
  const { image } = req.file;

  const user = await userController.show(id);

  if (user.profile !== 'admin') {
    throw new AppError(401, "Only admin user's can do this operation.");
  }

  const hotel = await hotelController.store({
    name, uf, city, street, quantity, dailyValue, image,
  });

  return res.json(hotel);
});

hotelsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.headers.userid;
  const {
    name, uf, city, street, quantityRoom, dailyValue,
  } = req.body;

  const user = await userController.show(userId);

  if (user.profile !== 'admin') {
    throw new AppError(401, "Only admin user's can do this operation.");
  }

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

  const user = await userController.show(id);

  if (user.profile !== 'admin') {
    throw new AppError(401, "Only admin user's can do this operation.");
  }

  await hotelController.delete({ id });

  return res.status(204).send();
});

export default hotelsRouter;
