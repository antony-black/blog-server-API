require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use('/api', router);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`App has been run on the PORT ${PORT}.`));
  } catch (error) {
    console.error("Error happened during app start: ", error);
  }
};

start();
