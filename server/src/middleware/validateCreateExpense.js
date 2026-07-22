const validateCreateExpense = (req, res, next) => {
    const { amount, category, date } = req.body;

    // Amount validation
    if (amount === undefined || amount === null || amount === "") {
        return res.status(400).json({
            success: false,
            message: "Amount is required"
        });
    }

    if (Number(amount) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Amount must be greater than zero"
        });
    }

    // Category validation
    if (!category || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    // Date validation
    if (!date) {
        return res.status(400).json({
            success: false,
            message: "Date is required"
        });
    }

    const todayString = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
    });

    if (date > todayString) {
        return res.status(400).json({
            success: false,
            message: "Future dates are not allowed"
        });
    }

    next();
};

module.exports = validateCreateExpense;