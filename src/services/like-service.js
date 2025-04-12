const { prisma } = require("../../prisma/prsma-client");
const ApiError = require("../exceptions/api-error");

class LikeService {
  async add(postId, userId) {
    const isLikeAdded = await prisma.like.findFirst({
      where: { postId, userId },
    });

    if (isLikeAdded) {
      throw ApiError.BadRequest("You have been already liked this post.");
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
      throw ApiError.NotFound("The like hasn't already existed.");
    }

    const likeData = await prisma.like.deleteMany({
      where: { postId: id, userId },
    });

    return likeData;
  }
}

module.exports = new LikeService();
