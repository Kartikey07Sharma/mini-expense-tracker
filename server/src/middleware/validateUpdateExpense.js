const validateUpdateExpense = (req, res, next) => {
    const { amount, category, date } = req.body;

    // At least one field should be present
    if (
        amount === undefined &&
        category === undefined &&
        date === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: "At least one field is required for update"
        });
    }

    // Amount validation
    if (
        amount !== undefined &&
        amount !== null &&
        Number(amount) <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Amount must be greater than zero"
        });
    }

    // Category validation
    if (
        category !== undefined &&
        category.trim() === ""
    ) {
        return res.status(400).json({
            success: false,
            message: "Category cannot be empty"
        });
    }

    // Date validation
    if (date) {
        const todayString = new Date().toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata"
        });

        if (date > todayString) {
            return res.status(400).json({
                success: false,
                message: "Future dates are not allowed"
            });
        }
    }

    next();
};

module.exports = validateUpdateExpense;