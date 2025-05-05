const express = require("express");

const { LikesController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const endpointPaths = require("../constants/enpoint-paths/index");

const router = express.Router();
const likesRoutes = endpointPaths.likes;

router.post(likesRoutes.add, authMiddleware, LikesController.add);
router.delete(likesRoutes.add, authMiddleware, LikesController.remove);

module.exports = router;
