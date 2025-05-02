const { prisma } = require("../../prisma/prisma-client");
const ApiError = require("../exceptions/api-error");

class PostsService {
  async create(content, authorId) {
    if (!content || content.trim().length === 0) {
      throw ApiError.BadRequest("Content is required.");
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId,
      },
    });

    return post;
  }

  async getAll(authorId) {
    const posts = await prisma.post.findMany({
      include: {
        likes: true,
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            email: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const postsWithLikeInfo = posts.map(post => ({
      ...post,
      likedByUser: post.likes.some(like => like.userId === authorId),
    }));

    return postsWithLikeInfo;
  }

  async getById(id, authorId) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
                email: true,
              },
            },
          },
        },
        likes: true,
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      throw ApiError.NotFound("Post not found!");
    }

    const postWithLikeInfo = {
      ...post,
      likedByUser: post.likes.some(like => like.userId === authorId),
    };

    return postWithLikeInfo;
  }

  async remove(id, userId) {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw ApiError.NotFound("Post not found!");
    }

    if (post.authorId !== userId) {
      throw ApiError.Forbidden("You have access to remove only your posts.");
    }

    const postData = await prisma.$transaction([
      prisma.comment.deleteMany({ where: { postId: id } }),
      prisma.like.deleteMany({ where: { postId: id } }),
      prisma.post.delete({ where: { id } }),
    ]);

    return postData;
  }
}

module.exports = new PostsService();
