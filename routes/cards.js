const express = require("express");
const router = express.Router();
const { Card } = require("../models/cards");
const { User } = require("../models/users");

router.get("/:userId", async (req, res) => {
  const cards = await Card.find({ userId: req.params.userId });
  res.send(cards);
});

router.post("/", async (req, res) => {
  let user = User.findById(req.body.userId);
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
