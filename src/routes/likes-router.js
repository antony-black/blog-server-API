const express = require("express");
const router = express.Router();

const { LikesController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/add", authMiddleware, LikesController.add);
router.delete("/remove/:id", authMiddleware, LikesController.remove);

module.exports = router;