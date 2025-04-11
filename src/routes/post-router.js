const express = require("express");
const router = express.Router();

const { PostController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/create", authMiddleware, PostController.create);
router.get("/", authMiddleware, PostController.getAll);
router.get("/:id", authMiddleware, PostController.getById);
router.post("/create", authMiddleware, PostController.create);
// router.put("/edit/:id", authMiddleware, PostController.edit);
router.delete("/remove/:id", authMiddleware, PostController.remove);

module.exports = router;
