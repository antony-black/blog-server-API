const { prisma } = require("../../prisma/prsma-client");
const bcrypt = require("bcryptjs");
const jdenticon = require("jdenticon");
const path = require("path");
const fs = require("fs");
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

    const avatarImage = jdenticon.toPng(name, 200);
    const avatarName = `${name}_${Date.now()}.png`;
    const avatarPath = path.join(__dirname, "../uploads", avatarName);
    fs.writeFileSync(avatarPath, avatarImage);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatarUrl: `/uploads/${avatarName}`,
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
