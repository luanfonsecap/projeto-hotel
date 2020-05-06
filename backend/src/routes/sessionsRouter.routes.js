import { Router } from 'express';

import SessionController from '../controllers/SessionController';
import User from '../models/User';

const sessionController = new SessionController(User);

const sessionsRouter = Router();

sessionsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await sessionController.show(id);

  return res.json(user);
});

sessionsRouter.post('/', async (req, res) => {
  const { name, email } = req.body;

  const user = await sessionController.store({ name, email });

  return res.json(user);
});

export default sessionsRouter;
