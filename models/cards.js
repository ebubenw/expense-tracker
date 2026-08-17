const mongoose = require("mongoose");
const Joi = require("joi");

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
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    cardName: Joi.string().required(),
    cardNumber: Joi.string().required(),
  });
  return schema.validate(card);
}

exports.cardSchema = cardSchema;
exports.validateCard = validateCard;
exports.Card = Card;
