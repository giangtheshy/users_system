const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const route = require("./server/routes/router");
const connectDB = require("./server/database/connection");

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 8080;
const app = express();

connectDB();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);

app.set("view engine", "ejs");

app.use("/css", express.static(path.join(__dirname, "assets/css")));
app.use("/js", express.static(path.join(__dirname, "assets/js")));
app.use("/img", express.static(path.join(__dirname, "assets/img")));

app.listen(PORT, () => {
  console.log(`Server run in http://localhost:${PORT}`);
});
