const express = require("express");
const multer = require("multer");

const { UsersController } = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const endpointPaths = require("../constants/enpoint-paths/index");

const router = express.Router();
const usersRoutes = endpointPaths.users;

const uploadDestination = "src/uploads";

const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.post(usersRoutes.registration, UsersController.registration);
router.post(usersRoutes.login, UsersController.login);
router.put(usersRoutes.update, authMiddleware, uploads.single("avatar"), UsersController.update);
router.get(usersRoutes.current, authMiddleware, UsersController.current);
router.get(usersRoutes.getById, authMiddleware, UsersController.getById);

module.exports = router;
