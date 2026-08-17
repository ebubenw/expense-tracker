const express = require("express");
const router = express.Router();
const { Expense, validateExpense } = require("../models/expenses");

router.get("/:cardId/:userId", async (req, res) => {
  const expenses = await Expense.find({
    cardId: req.params.cardId,
    userId: req.params.userId,
  });
  res.json(expenses);
});

router.post("/:cardId/:userId", async (req, res) => {
  const { error } = validateExpense(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const expense = new Expense({
    cardId: req.body.cardId,
    userId: req.body.userId,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
    date: req.body.date,
  });
  await expense.save();
  res.json(expense);
});

module.exports = router;
