const { prisma } = require("../../prisma/prisma-client");
const bcrypt = require("bcryptjs");
const jdenticon = require("jdenticon");
const path = require("path");
const fs = require("fs");

const TokensService = require("./tokens-service");
const UserDto = require("../dtos/user-dto");
const ExpandedUserDto = require("../dtos/expanded-user-dto");
const ApiError = require("../exceptions/api-error");
const errorMessages = require("../constants/error-messages/index");

class UsersService {
  async registration(name, email, password) {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      throw ApiError.BadRequest(errorMessages.AUTH.EMAIL_IN_USE);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarImage = jdenticon.toPng(name, 200);
    const avatarName = `${name}_${Date.now()}.png`;
    const avatarPath = path.resolve("uploads", avatarName);
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

    const tokens = TokensService.generateTokens({ ...userData });

    return { ...tokens, userData };
  }

  async login(email, password) {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    const hasTheSamePassword = await bcrypt.compare(password, user.password);

    if (!user || !hasTheSamePassword) {
      throw ApiError.BadRequest(errorMessages.AUTH.WRONG_CREDENTIALS);
    }

    const userData = new UserDto(user);

    const tokens = TokensService.generateTokens({ ...userData });

    return { ...tokens, userData };
  }

  async getById(id, userId) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        followers: true,
        following: true,
      },
    });

    if (!user) {
      throw ApiError.NotFound(errorMessages.AUTH.NOT_FOUND);
    }

    const isFollowing = await prisma.follows.findFirst({
      where: {
        AND: [{ followerId: userId, followingId: id }],
      },
    });

    const publicUserData = new ExpandedUserDto(user);

    return {
      ...publicUserData,
      isFollowing: Boolean(isFollowing),
    };
  }

  async update(data, file, id) {
    const updates = {};

    // Handle safe fields
    if (data.name) updates.name = data.name;
    if (data.email) {
      const existingUser = await prisma.user.findFirst({ where: { email: data.email } });
      if (existingUser && existingUser.id !== id) {
        throw ApiError.BadRequest(errorMessages.AUTH.EMAIL_IN_USE);
      }
      updates.email = data.email;
    }
    if (data.bio) updates.bio = data.bio;
    if (data.location) updates.location = data.location;

    // Date validation
    if (data.dateOfBirth) {
      const parsedDate = new Date(data.dateOfBirth);
      if (isNaN(parsedDate)) {
        throw ApiError.BadRequest(errorMessages.COMMON.INVALID_DATE);
      }
      updates.dateOfBirth = parsedDate;
    }

    // Handle file upload
    if (file && file.path) {
      updates.avatarUrl = `/uploads/${file.filename}`;
    }

    // Final update
    const user = await prisma.user.update({
      where: { id },
      data: updates,
    });

    const publicUserData = new ExpandedUserDto(user);

    return publicUserData;
  }

  async current(req, res) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        followers: {
          include: {
            follower: true,
          },
        },
        following: {
          include: {
            following: true,
          },
        },
      },
    });

    if (!user) {
      throw ApiError.UnautorizedError();
    }

    const publicUserData = new UserDto(user);

    res.json(publicUserData);
  }
}

module.exports = new UsersService();
