require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const userRouter = require("./routes/user-router");
const postRouter = require("./routes/post-router");
const commentRouter = require("./routes/comment-router");
const likeRouter = require("./routes/like-router");
const followRouter = require("./routes/follow-router");
const errorMiddleWare = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static("src/uploads"));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);
app.use("/api/followers", followRouter);
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
