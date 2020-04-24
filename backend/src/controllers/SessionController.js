class SessionController {
  constructor(user) {
    this.User = user;
  }

  async store({ email }) {
    let user = await this.User.findOne({ email });

    if (user) {
      throw new Error('This user is already logged');
    }

    user = await this.User.create({ email });

    return user;
  }
}

export default SessionController;
