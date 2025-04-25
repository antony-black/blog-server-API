const { prisma } = require("../../prisma/prisma-client");
const ApiError = require("../exceptions/api-error");

class FollowsService {
  async follow(followingId, userId) {
    if (followingId === userId) {
      throw ApiError.BadRequest("You can't follow yourself.");
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
      throw ApiError.BadRequest("You have already subscribed on this account.");
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
      throw ApiError.NotFound("Subscription hasn't found.")
    }

    const followingData = await prisma.follows.delete({
      where: {id: hasFollowing.id}
    });

    return followingData;
  }
}

module.exports = new FollowsService();
