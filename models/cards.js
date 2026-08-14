const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cardName: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

exports.cardSchema = cardSchema;
exports.Card = Card;
