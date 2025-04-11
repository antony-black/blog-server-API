const express = require("express");
const router = express.Router();

const { FollowController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/follow", authMiddleware, FollowController.follow);
router.delete("/unfollow/:id", authMiddleware, FollowController.unfollow);

module.exports = router;