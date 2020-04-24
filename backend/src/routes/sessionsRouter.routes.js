import { Router } from 'express';

import SessionController from '../controllers/SessionController';
import User from '../models/User';

const sessionController = new SessionController(User);

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email } = req.body;

  const user = await sessionController.store({ email });

  return res.json(user);
});

export default sessionsRouter;
