const express = require("express");
const router = express.Router();

const { FollowsController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/follow", authMiddleware, FollowsController.follow);
router.delete("/unfollow/:id", authMiddleware, FollowsController.unfollow);

module.exports = router;