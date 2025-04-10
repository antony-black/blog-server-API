const { CommentService } = require("../services");

class CommentController {
  async create(req, res, next) {
    try {
      const { postId, content } = req.body;
      const userId = req.user.id;

      const comment = await CommentService.create(postId, content, userId);

      res.json(comment);
    } catch (error) {
      next(error);
    }
  }
  // async edit(req, res, next) {
  //   try {

  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const authorId = req.user.id;

      const removedCommentData = await CommentService.remove(id, authorId);

      res.json(removedCommentData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
