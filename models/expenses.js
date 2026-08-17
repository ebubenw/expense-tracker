const mongoose = require("mongoose");
const Joi = require("joi");

const expenseSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

function validateExpense(expense) {
  const schema = Joi.object({
    cardId: Joi.string().required(),
    userId: Joi.string().required(),
    amount: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date(),
  });
  return schema.validate(expense);
}

exports.expenseSchema = expenseSchema;
exports.validateExpense = validateExpense;
exports.Expense = Expense;
