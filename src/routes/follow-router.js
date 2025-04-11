const express = require("express");
const router = express.Router();

const { FollowController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, FollowController.create);
router.delete("/unfollow/:id", authMiddleware, FollowController.remove);

module.exports = router;