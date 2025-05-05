const endpointPaths = {
  users: {
    registration: "/registration",
    login: "/login",
    update: "/update/:id",
    current: "/current",
    getById: "/:id"
  },
  posts: {
    create: "/create",
    getAll: "/",
    getById: "/:id",
    remove: "/remove/:id"
  },
  comments: {
    create: "/create",
    remove: "/remove/:id"
  },
  likes: {
    add: "/add",
    remove: "/remove/:id"
  },
  follows: {
    follow: "/follow",
    unfollow: "/unfollow/:id"
  }
};

module.exports = endpointPaths;
