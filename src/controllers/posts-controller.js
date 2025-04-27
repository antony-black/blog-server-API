const { PostsService } = require("../services");

class PostsController {
  async create(req, res, next) {
    try {
      const { content } = req.body;
      const authorId = req.user.id;

      const post = await PostsService.create(content, authorId);

      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const authorId = req.user.id;

      const posts = await PostsService.getAll(authorId);

      res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const authorId = req.user.id;

      const post = await PostsService.getById(id, authorId);

      res.json(post);
    } catch (error) {
      next(error);
    }
  }

  // async edit(req, res, next) {
  //   try {
  //   } catch (error) {
  //     console.error("PostController/edit: ", error);
  //     next(error);
  //   }
  // }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const removedPostData = await PostsService.remove(id, userId);

      res.json(removedPostData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostsController();
