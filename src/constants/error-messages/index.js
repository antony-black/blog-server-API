module.exports = {
  AUTH: {
    UNAUTHORIZED: "User isn't authorized!",
    FORBIDDEN: "You do not have permission!",
    WRONG_CREDENTIALS: "Wrong email or password.",
    EMAIL_IN_USE: "User with this email already exists. Please, login.",
    NOT_FOUND: "No such user found. Please sign up.",
  },
  POSTS: {
    NOT_FOUND: "Post not found!",
    DELETE_FORBIDDEN: "You can only remove your own posts.",
    EMPTY_CONTENT: "Content is required.",
  },
  COMMENTS: {
    NOT_FOUND: "Comment not found.",
    EMPTY_CONTENT: "Content is required.",
  },
  FOLLOWS: {
    SELF_FOLLOW: "You can't follow yourself.",
    ALREADY_FOLLOWED: "You have already subscribed on this account.",
    NOT_FOUND: "Subscription hasn't been found.",
  },
  LIKES: {
    ALREADY_LIKED: "You have already liked this post.",
    NOT_FOUND: "The like hasn't already existed.",
  },
  COMMON: {
    NOT_FOUND: "Resource not found!",
    INTERNAL_ERROR: "Something went wrong!",
    INVALID_DATE: "Invalid date format for dateOfBirth. Use YYYY-MM-DD.",
  },
};
