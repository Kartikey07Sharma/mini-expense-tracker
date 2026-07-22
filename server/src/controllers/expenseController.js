const db = require("../database/db");

// ================= CREATE EXPENSE =================
const createExpense = async (req, res) => {
    try {
        const { amount, category, date, note } = req.body;

        const [result] = await db.execute(
            `INSERT INTO expenses
            (amount, category, date, note)
            VALUES (?, ?, ?, ?)`,
            [amount, category, date, note || null]
        );

        console.log("Insert Result:", result);
        console.log("Inserted ID:", result.insertId);
        console.log("Affected Rows:", result.affectedRows);

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            expenseId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create expense"
        });
    }
};

// ================= GET EXPENSES =================
const getExpenses = async (req, res) => {
    try {
        const { category, startDate, endDate } = req.query;

        let query = `
            SELECT *
            FROM expenses
            WHERE 1 = 1
        `;

        const params = [];

        if (category) {
            query += " AND category = ?";
            params.push(category);
        }

        if (startDate) {
            query += " AND date >= ?";
            params.push(startDate);
        }

        if (endDate) {
            query += " AND date <= ?";
            params.push(endDate);
        }

        query += " ORDER BY date DESC";

        const [expenses] = await db.execute(query, params);

        res.status(200).json({
            success: true,
            count: expenses.length,
            filters: {
                category: category || null,
                startDate: startDate || null,
                endDate: endDate || null
            },
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

// ================= UPDATE EXPENSE =================
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category, date, note } = req.body;

        const [result] = await db.execute(
            `UPDATE expenses
             SET amount = ?,
                 category = ?,
                 date = ?,
                 note = ?,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [amount, category, date, note || null, id]
        );

        if (result.affectedRows === 0) {
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

// ================= DELETE EXPENSE =================
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            "DELETE FROM expenses WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
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

// ================= SUMMARY =================
const getExpenseSummary = async (req, res) => {
    try {

        const [[totalExpenses]] = await db.execute(
            `SELECT COALESCE(SUM(amount),0) AS total
             FROM expenses`
        );

        const [[highestExpense]] = await db.execute(
            `SELECT COALESCE(MAX(amount),0) AS highest
             FROM expenses`
        );

        const [[averageExpense]] = await db.execute(
            `SELECT COALESCE(AVG(amount),0) AS average
             FROM expenses`
        );

        const [categoryBreakdown] = await db.execute(
            `SELECT category,
                    SUM(amount) AS total
             FROM expenses
             GROUP BY category
             ORDER BY total DESC`
        );

        const [recentExpenses] = await db.execute(
            `SELECT *
             FROM expenses
             ORDER BY created_at DESC
             LIMIT 5`
        );

        res.status(200).json({
            success: true,
            totalExpenses: totalExpenses.total,
            highestExpense: highestExpense.highest,
            averageExpense: Number(
                averageExpense.average
            ).toFixed(2),
            categoryBreakdown,
            recentExpenses
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