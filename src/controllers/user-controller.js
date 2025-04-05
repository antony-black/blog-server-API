class UserController {
  async registration(req, res, next) {
    try {
      res.json('Hello World')
    } catch (error) {
      console.error('UserController/registration: ', error);
      next(error);
    }
  }
}

module.exports = new UserController();