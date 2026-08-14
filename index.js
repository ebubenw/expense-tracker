const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use("/", require("./routes/home"));
app.use("/track.com/api/users", require("./routes/users"));
app.use("/track.com/api/cards", require("./routes/cards"));
app.use("/track.com/api/expenses", require("./routes/expenses"));

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
