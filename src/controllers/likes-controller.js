const { LikesService } = require("../services");

class LikesController {
  async add(req, res, next) {
    try {
      const { postId } = req.body;
      const userId = req.user.id;

      const like = await LikesService.add(postId, userId);

      res.json(like);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const likeData = await LikesService.remove(id, userId);

      res.json(likeData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LikesController();
