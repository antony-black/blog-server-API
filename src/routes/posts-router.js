const express = require("express");
const router = express.Router();

const { PostsController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/create", authMiddleware, PostsController.create);
router.get("/", authMiddleware, PostsController.getAll);
router.get("/:id", authMiddleware, PostsController.getById);
// router.put("/edit/:id", authMiddleware, PostController.edit);
router.delete("/remove/:id", authMiddleware, PostsController.remove);

module.exports = router;
