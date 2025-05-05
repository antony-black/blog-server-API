const express = require("express");

const { PostsController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const endpointPaths = require("../constants/enpoint-paths/index");

const router = express.Router();
const postsRoutes = endpointPaths.posts;

router.post(postsRoutes.create, authMiddleware, PostsController.create);
router.get(postsRoutes.getAll, authMiddleware, PostsController.getAll);
router.get(postsRoutes.getById, authMiddleware, PostsController.getById);
// router.put("/edit/:id", authMiddleware, PostController.edit);
router.delete(postsRoutes.remove, authMiddleware, PostsController.remove);

module.exports = router;
