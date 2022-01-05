const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const db = require("./util/database");
const flight = require("./routes/flight");

const app = express();

// db.execute("SELECT * FROM account")
// .then((result)=>{
//     console.log(result[0][0])
// })
// .catch(err=>{console.log(err)});
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: true })); //used for x-www-url-encoded <form>
//app.use(express.json()) //used for application/json
app.use(bodyParser.json()); //used for application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



app.use(flight)
app.use("/", (req, res, next) => {
  res.status(200).json({
    message: "path not found",
  });
});

app.listen(process.env.PORT || 8050);
