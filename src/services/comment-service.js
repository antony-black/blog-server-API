const { prisma } = require("../../prisma/prsma-client");
const ApiError = require("../exceptions/api-error");

class CommentService {
  async create(postId, content, userId) {
    if (!content || content.trim().length === 0) {
      throw ApiError.BadRequest("Content is required.");
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });

    return comment;
  }
  // async edit(req, res, next) {
  //   try {

  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async remove(id, authorId) {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw ApiError.NotFound("Comment not found.");
    }

    if (comment.userId !== authorId) {
      throw ApiError.Forbidden("You have access to remove only your comments.");
    }

    const commentData = await prisma.comment.delete({ where: { id } });

    return commentData;
  }
}

module.exports = new CommentService();
