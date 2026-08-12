const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User } = require("../models/users");

router.get("/", async (req, res) => {
  const user = await User.find().select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
