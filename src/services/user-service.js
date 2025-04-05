const { prisma } = require("../../prisma/prsma-client");
const bcrypt = require("bcryptjs");
const TokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(name, email, password) {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      throw new Error("User with this email has already existed. Please, login.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const userData = new UserDto(newUser);

    const tokens = TokenService.generateTokens({ ...userData });

    return { ...tokens, userData };
  }

  async login(email, password) {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    const hasTheSamePassword = await bcrypt.compare(password, user.password);

    if (!user || !hasTheSamePassword) {
      throw new Error("Wrong email or password.");
    }

    const userData = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userData });

    return { ...tokens, userData };
  }

  async getById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async update(data, id) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async current(req, res) {
    res.status(200).json(req.user);
  }
}

module.exports = new UserService();
