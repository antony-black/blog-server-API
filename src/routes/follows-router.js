const express = require("express");

const { FollowsController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const endpointPaths = require("../constants/enpoint-paths/index");

const router = express.Router();
const followsRoutes = endpointPaths.follows;

router.post(followsRoutes.follow, authMiddleware, FollowsController.follow);
router.delete(followsRoutes.unfollow, authMiddleware, FollowsController.unfollow);

module.exports = router;
