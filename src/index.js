require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const userRouter = require("./routes/user-router");
const postRouter = require("./routes/post-router");
const errorMiddleWare = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
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
