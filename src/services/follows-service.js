const { prisma } = require("../../prisma/prisma-client");

const ApiError = require("../exceptions/api-error");
const errorMessages = require('../constants/error-messages/index');

class FollowsService {
  async follow(followingId, userId) {
    if (followingId === userId) {
      throw ApiError.BadRequest(errorMessages.FOLLOWS.SELF_FOLLOW);
    }

    const hasSubscription = await prisma.follows.findFirst({
      where: {
        AND: [
          {followerId: userId},
          {followingId},
        ],
      },
    });

    if (hasSubscription) {
      throw ApiError.BadRequest(errorMessages.FOLLOWS.ALREADY_FOLLOWED);
    }

    const followingData = await prisma.follows.create({
      data: {
        follower: { connect: { id: userId } },
        following: { connect: { id: followingId } },
      },
    });

    return followingData;
  }

  async unfollow(followingId, userId) {
    const hasFollowing = await prisma.follows.findFirst({
      where: {
        AND: [
          {followerId: userId},
          {followingId},
        ],
      },
    });

    if (!hasFollowing) {
      throw ApiError.NotFound(errorMessages.FOLLOWS.NOT_FOUND)
    }

    const followingData = await prisma.follows.delete({
      where: {id: hasFollowing.id}
    });

    return followingData;
  }
}

module.exports = new FollowsService();
