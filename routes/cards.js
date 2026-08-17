const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Card, validateCard } = require("../models/cards");
const { User } = require("../models/users");

router.get("/:userId", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).send("Invalid user ID.");
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).send("User with this ID does not exist.");
  }
  const cards = await Card.find({ userId: req.params.userId });
  res.send(cards);
});

router.post("/", async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findById(req.body.userId);
  if (!user) {
    return res.status(400).send("User with this ID does not exist.");
  }
  let existingCard = await Card.findOne({
    userId: req.body.userId,
    cardNumber: req.body.cardNumber,
  });
  if (existingCard) {
    return res.status(400).send("Card with this number already exists.");
  }
  const card = new Card({
    userId: req.body.userId,
    cardName: req.body.cardName,
    cardNumber: req.body.cardNumber,
  });
  await card.save();
  res.send(card);
});

router.delete("/:id", async (req, res) => {
  const card = await Card.findByIdAndDelete(req.params.id);
  if (!card) {
    return res.status(404).send("Card with this ID does not exist.");
  }
  res.send(card);
});

module.exports = router;
