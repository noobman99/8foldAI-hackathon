const mongoose = require("mongoose");
const express = require("express");
const router = require("./routes");
const cors = require("cors");

const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// log requests
app.use("/api", (req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use("/api", router);

app.use("/static/resume", express.static("static/resume"));
app.use("/static/recommendation", express.static("static/recommendation"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
