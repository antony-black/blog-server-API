const express = require("express");
const router = express.Router();

const { CommentsController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/create", authMiddleware, CommentsController.create);
router.delete("/remove/:id", authMiddleware, CommentsController.remove);

module.exports = router;