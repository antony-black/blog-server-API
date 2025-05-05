require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const routesPaths = require("./constants/routes-paths/index");
const { 
  usersRouter, 
  postsRouter, 
  commentsRouter, 
  likesRouter, 
  followsRouter 
} = require("./routes");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const uploadsPath = path.join(__dirname, "src", "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use(routesPaths.uploads, express.static(uploadsPath));

app.use(routesPaths.users, usersRouter);
app.use(routesPaths.posts, postsRouter);
app.use(routesPaths.comments, commentsRouter);
app.use(routesPaths.likes, likesRouter);
app.use(routesPaths.followers, followsRouter);

app.use(errorMiddleware);

module.exports = app;
