const FollowsService = require("../services/follows-service");

class FollowsController {
  async follow(req, res, next) {
    try {
      const { followingId } = req.body;
      const userId = req.user.id;

      const followingData = await FollowsService.follow(followingId, userId);

      res.json(followingData);
    } catch (error) {
      next(error);
    }
  }

  async unfollow(req, res, next) {
    try {
      const followingId = req.params.followingId;
      const userId = req.user.id;

      const unfollowingData = await FollowsService.unfollow(followingId, userId);

      res.json(unfollowingData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FollowsController();
