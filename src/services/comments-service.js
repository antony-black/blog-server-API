const { prisma } = require("../../prisma/prisma-client");

const ApiError = require("../exceptions/api-error");
const errorMessages = require('../constants/error-messages/index');

class CommentsService {
  async create(postId, content, userId) {
    if (!content || content.trim().length === 0) {
      throw ApiError.BadRequest(errorMessages.COMMENTS.EMPTY_CONTENT);
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

  async remove(id) {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw ApiError.NotFound(errorMessages.COMMENTS.NOT_FOUND);
    }

    const commentData = await prisma.comment.delete({ where: { id } });

    return commentData;
  }
}

module.exports = new CommentsService();
