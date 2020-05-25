import AppError from '../errors/AppError';

class SessionController {
  constructor(user) {
    this.User = user;
  }

  async show(id) {
    const user = await this.User.findById(id);

    return user;
  }

  async store({ name, email }) {
    let user = await this.User.findOne({ email });

    if (user) {
      return user;
    }

    user = await this.User.create({ name, email });

    return user;
  }
}

export default SessionController;
