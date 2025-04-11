const { UserService } = require("../services");

class UserController {
  async registration(req, res, next) {
    try {
      // TODO: here is the visible password in the http. Figure out how to make it hashed or invisible
      const { name, email, password } = req.body;
      const user = await UserService.registration(name, email, password);
      // res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(user);
    } catch (error) {
      console.error("UserController/login: ", error);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      // TODO: here is the visible password in the http. Figure out how to make it hashed or invisible
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      // res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json(user);
    } catch (error) {
      console.error("UserController/login: ", error);
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      console.log("Authenticated user:", req.user);
      const { id } = req.params;
      const userId = req.user.id;

      const user = await UserService.getById(id, userId);

      res.json(user);
    } catch (error) {
      console.error("UserController/getUserById: ", error);
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      console.log("Authenticated user:", req.user);
      const data = req.body;
      const file = req.file;
      const { id } = req.params;

      if (id !== req.user.id) {
        return res.status(403).json({ error: "Unauthorized to update this user." });
      }

      const user = await UserService.update(data, file, id);

      res.json(user);
    } catch (error) {
      console.error("UserController/updateUser: ", error);
      next(error);
    }
  }

  async current(req, res, next) {
    try {
      console.log("Authenticated user:", req.user);
      await UserService.current(req, res);
    } catch (error) {
      console.error("UserController/currentUser: ", error);
      next(error);
    }
  }

  // async remove(req, res, next) {}
}

module.exports = new UserController();
