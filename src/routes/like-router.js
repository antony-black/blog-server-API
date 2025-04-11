const express = require("express");
const router = express.Router();

const { LikeController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/add", authMiddleware, LikeController.add);
router.delete("/remove/:id", authMiddleware, LikeController.remove);

module.exports = router;