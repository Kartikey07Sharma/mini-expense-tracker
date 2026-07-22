const express = require("express");

const router = express.Router();

// Middleware
const validateCreateExpense = require("../middleware/validateCreateExpense");
const validateUpdateExpense = require("../middleware/validateUpdateExpense");

// Controllers
const {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getExpenseSummary
} = require("../controllers/expenseController");

// ================= Expense Routes =================

// Create Expense
router.post("/", validateCreateExpense, createExpense);

// Get Expense Summary
router.get("/summary", getExpenseSummary);

// Get All Expenses
router.get("/", getExpenses);

// Update Expense
router.put("/:id", validateUpdateExpense, updateExpense);

// Delete Expense
router.delete("/:id", deleteExpense);

module.exports = router;