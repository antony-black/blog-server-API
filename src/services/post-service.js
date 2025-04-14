const { prisma } = require("../../prisma/prsma-client");
const ApiError = require("../exceptions/api-error");

class PostService {
  async create(content, authorId) {
    if (content.length > 0){
      throw ApiError.BadRequest("The content not found. All fields are required.")
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
        author: true,
        comments: true,
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
            user: true,
          },
        },
        likes: true,
        author: true,
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

  // async edit() {}

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

module.exports = new PostService();
