const express = require("express");

const router = express.Router();

const validateExpense = require("../middleware/validateExpense");

const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getExpenseSummary
} = require("../controllers/expenseController");

router.post("/", validateExpense, createExpense);

router.get("/summary", getExpenseSummary);

router.get("/", getExpenses);

router.put("/:id", validateExpense, updateExpense);

router.delete("/:id", deleteExpense);

module.exports = router;