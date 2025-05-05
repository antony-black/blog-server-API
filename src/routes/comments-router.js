const express = require("express");

const { CommentsController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const endpointPaths = require("../constants/enpoint-paths/index");

const router = express.Router();
const commentsRoutes = endpointPaths.comments;

router.post(commentsRoutes.create, authMiddleware, CommentsController.create);
router.delete(commentsRoutes.remove, authMiddleware, CommentsController.remove);

module.exports = router;
