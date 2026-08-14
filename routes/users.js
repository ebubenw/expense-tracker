const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User } = require("../models/users");

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User with this email already exists.");
  }
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
