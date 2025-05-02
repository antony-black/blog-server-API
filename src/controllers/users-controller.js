const { UsersService } = require("../services");

class UsersController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await UsersService.registration(name, email, password);
      // res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UsersService.login(email, password);
      // res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const user = await UsersService.getById(id, userId);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = req.body;
      const file = req.file;
      const { id } = req.params;

      const user = await UsersService.update(data, file, id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async current(req, res, next) {
    try {
      await UsersService.current(req, res);
    } catch (error) {
      next(error);
    }
  }

  // async remove(req, res, next) {}
}

module.exports = new UsersController();
