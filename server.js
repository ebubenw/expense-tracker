const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const MONGODB_URI = "mongodb://localhost:27017/swiftexpensedb";
const PORT = 3000;

//Connect to mongodb
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//Define a simple route
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
