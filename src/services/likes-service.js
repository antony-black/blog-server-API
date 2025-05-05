const { prisma } = require("../../prisma/prisma-client");

const ApiError = require("../exceptions/api-error");
const errorMessages = require('../constants/error-messages/index');

class LikesService {
  async add(postId, userId) {
    const isLikeAdded = await prisma.like.findFirst({
      where: { postId, userId },
    });

    if (isLikeAdded) {
      throw ApiError.BadRequest(errorMessages.LIKES.ALREADY_LIKED);
    }

    const like = await prisma.like.create({
      data: { postId, userId },
    });

    return like;
  }

  async remove(id, userId) {
    const isLikeAdded = await prisma.like.findFirst({
      where: { postId: id, userId },
    });

    if (!isLikeAdded) {
      throw ApiError.NotFound(errorMessages.LIKES.NOT_FOUND);
    }

    const likeData = await prisma.like.deleteMany({
      where: { postId: id, userId },
    });

    return likeData;
  }
}

module.exports = new LikesService();
