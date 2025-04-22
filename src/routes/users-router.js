const express = require("express");
const router = express.Router();
const multer = require("multer");

const {UsersController} = require("../controllers");
const authMiddleware = require('../middlewares/auth-middleware');

const uploadDestination = "src/uploads";

const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.put("/update/:id", authMiddleware, UsersController.update);
router.get("/current", authMiddleware, UsersController.current);
router.get("/:id", authMiddleware, UsersController.getById);

module.exports = router;
