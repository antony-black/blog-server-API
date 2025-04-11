const express = require("express");
const router = express.Router();

const { CommentController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/create", authMiddleware, CommentController.create);
router.delete("/remove/:id", authMiddleware, CommentController.remove);

module.exports = router;