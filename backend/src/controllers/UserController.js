import AppError from '../errors/AppError';

class SessionController {
  constructor(user) {
    this.User = user;
  }

  async show(id) {
    const user = await this.User.findById(id);

    if (!user) {
      throw new AppError(400, 'User does not exist.');
    }

    return user;
  }
}

export default SessionController;
