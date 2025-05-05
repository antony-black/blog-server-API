require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const routesPaths = require("./constants/routes-paths/index");
const { usersRouter, postsRouter, commentsRouter, likesRouter, followsRouter } = require("./routes");
const errorMiddleWare = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routesPaths.uploads, express.static("src/uploads"));
app.use(routesPaths.users, usersRouter);
app.use(routesPaths.posts, postsRouter);
app.use(routesPaths.comments, commentsRouter);
app.use(routesPaths.likesRouter, likesRouter);
app.use(routesPaths.followers, followsRouter);
app.use(errorMiddleWare);

// TODO!!: assign all strings to const
// TODO!!: create new DTOs for posts, comments, likes etc.? or let it be as is
const uploadsPath = path.join(__dirname, "src", "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}
// if (!fs.existsSync("src/uploads")) {
//   fs.mkdirSync("src/uploads");
// }

const start = () => {
  try {
    app.listen(PORT, () => console.log(`App has been run on the PORT ${PORT}.`));
  } catch (error) {
    console.error("Error happened during app start: ", error);
  }
};

start();
