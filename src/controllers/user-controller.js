const { UserService } = require("../services");

class UserController {
  async registration(req, res, next) {
    try {
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
      const {email, password } = req.body;
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
      const {id} = req.params;

      const user = await UserService.getById(id);

      res.json(user);
    } catch (error) {
      console.error("UserController/getUserById: ", error);
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = req.body;
      const { id } = req.params;

      if (data.dateOfBirth) {
        const parsedDate = new Date(data.dateOfBirth);
  
        if (isNaN(parsedDate)) {
          return res.status(400).json({ error: "Invalid date format for dateOfBirth. Use YYYY-MM-DD." });
        }
  
        data.dateOfBirth = parsedDate;
      }

      const user = await UserService.update(data, id);

      res.json(user);
    } catch (error) {
      console.error("UserController/updateUser: ", error);
      next(error);
    }
  }

  async current(req, res, next) {
    try {
      await UserService.current(req, res);
    } catch (error) {
      console.error("UserController/currentUser: ", error);
      next(error);
    }
  }
}

module.exports = new UserController();
