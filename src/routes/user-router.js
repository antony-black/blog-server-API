const express = require("express");
const router = express.Router();
const multer = require("multer");

const {UserController} = require("../controllers");
const authMiddleware = require('../middlewares/auth-middleware');

const uploadDestination = "uploads";

const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });


router.post("/test", (req, res) => {
  res.send("Test route works!");
});


router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.put("/update/:id", UserController.update);
router.get("/current", authMiddleware, UserController.current);
router.get("/:id", UserController.getById);

module.exports = router;
