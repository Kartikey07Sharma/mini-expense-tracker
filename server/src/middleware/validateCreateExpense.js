const validateCreateExpense = (req, res, next) => {
    const { amount, category, date } = req.body;

    if (!amount) {
        return res.status(400).json({
            success: false,
            message: "Amount is required"
        });
    }

    if (amount <= 0) {
        return res.status(400).json({
            success: false,
            message: "Amount must be greater than zero"
        });
    }

    if (!category || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    if (!date) {
        return res.status(400).json({
            success: false,
            message: "Date is required"
        });
    }

    const expenseDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (expenseDate > today) {
        return res.status(400).json({
            success: false,
            message: "Future dates are not allowed"
        });
    }

    next();
};

module.exports = validateCreateExpense;