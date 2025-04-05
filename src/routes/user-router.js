const express = require("express");
const router = express.Router();
const multer = require("multer");

const UserController = require("../controllers/user-controller");

const uploadDestination = "uploads";

const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.post("/registration", UserController.registration);
router.get("/", UserController.registration);

module.exports = router;
