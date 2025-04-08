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

  async getById(id, userId) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        followers: true,
        following: true,
      },
    });

    const isFollowing = await prisma.follows.findFirst({
      where: {
        AND: [{ followerId: userId, followingId: id }],
      },
    });

    const publicUserData = new UserDto(user);

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
      throw new Error(`Email ${data.email} is already in use.`);
    }
    updates.email = data.email;
  }
  if (data.bio) updates.bio = data.bio;
  if (data.location) updates.location = data.location;

  // Date validation
  if (data.dateOfBirth) {
    const parsedDate = new Date(data.dateOfBirth);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format for dateOfBirth. Use YYYY-MM-DD.");
    }
    updates.dateOfBirth = parsedDate;
  }

  // Handle file upload
  if (file && file.path) {
    updates.avatarUrl = `/${file.path}`;
  }

  // Final update
  const user = await prisma.user.update({
    where: { id },
    data: updates,
  });

  const publicUserData = new UserDto(user);

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

    const publicUserData = new UserDto(user);

    res.json(publicUserData);
  }
}

module.exports = new UserService();
