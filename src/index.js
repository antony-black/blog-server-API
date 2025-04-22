require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const { usersRouter, postsRouter, commentsRouter, likesRouter, followsRouter } = require("./routes");
const errorMiddleWare = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static("src/uploads"));
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/followers", followsRouter);
app.use(errorMiddleWare);

if (!fs.existsSync("src/uploads")) {
  fs.mkdirSync("src/uploads");
}

const start = () => {
  try {
    app.listen(PORT, () => console.log(`App has been run on the PORT ${PORT}.`));
  } catch (error) {
    console.error("Error happened during app start: ", error);
  }
};

start();
