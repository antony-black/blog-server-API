const { PostService } = require("../services");

class PostController {
  async create(req, res, next) {
    try {
      const { content } = req.body;
      const authorId = req.user.id;

      if (!content) {
        return res.status(400).json({ error: "PostController/create: all fields are required!" });
      }

      const post = await PostService.create(content, authorId);

      res.json(post);
    } catch (error) {
      console.error("PostController/create: ", error);
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const authorId = req.user.id;

      const posts = await PostService.getAll(authorId);

      res.json(posts);
    } catch (error) {
      console.error("PostController/getAll: ", error);
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const authorId = req.user.id;

      const post = await PostService.getById(id, authorId);

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

      const removedPostData = await PostService.remove(id, userId);

      res.json(removedPostData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
