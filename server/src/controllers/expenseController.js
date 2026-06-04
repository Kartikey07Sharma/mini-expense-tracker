const db = require("../database/db");

const createExpense = (req, res) => {
    try {
        const { amount, category, date, note } = req.body;

        const statement = db.prepare(`
  INSERT INTO expenses (
    amount,
    category,
    date,
    note
  )
  VALUES (?, ?, ?, ?)
`);

        const result = statement.run(
            amount,
            category,
            date,
            note || null
        );

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            expenseId: result.lastInsertRowid
        });


    } catch (error) {
        console.error(error);


        res.status(500).json({
            success: false,
            message: "Failed to create expense"
        });


    }
};

const getExpenses = (req, res) => {
    try {
        const expenses = db
            .prepare(`
        SELECT *
        FROM expenses
        ORDER BY date DESC
      `)
            .all();

        res.status(200).json({
            success: true,
            data: expenses
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch expenses"
        });
    }
};

const updateExpense = (req, res) => {
    try {
        const { id } = req.params;

        const {
            amount,
            category,
            date,
            note
        } = req.body;

        const result = db.prepare(`
      UPDATE expenses
      SET
        amount = ?,
        category = ?,
        date = ?,
        note = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
            amount,
            category,
            date,
            note || null,
            id
        );

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update expense"
        });
    }
};

const deleteExpense = (req, res) => {
    try {
        const { id } = req.params;

        const result = db.prepare(`
      DELETE FROM expenses
      WHERE id = ?
    `).run(id);

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete expense"
        });
    }
};

const getExpenseSummary = (req, res) => {
    try {

        const totalExpenses = db.prepare(`
      SELECT COALESCE(SUM(amount),0) AS total
      FROM expenses
    `).get();

        const highestExpense = db.prepare(`
      SELECT COALESCE(MAX(amount),0) AS highest
      FROM expenses
    `).get();

        const categoryBreakdown = db.prepare(`
      SELECT
        category,
        SUM(amount) AS total
      FROM expenses
      GROUP BY category
    `).all();

        res.status(200).json({
            success: true,
            totalExpenses: totalExpenses.total,
            highestExpense: highestExpense.highest,
            categoryBreakdown
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch summary"
        });
    }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getExpenseSummary
};
