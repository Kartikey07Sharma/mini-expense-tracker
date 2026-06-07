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

    const today = new Date();

    const todayString =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

    console.log("Received Date:", date);
    console.log("Today String:", todayString);

    if (date > todayString) {
        return res.status(400).json({
            success: false,
            message: "Future dates are not allowed"
        });
    }

    next();
};

module.exports = validateCreateExpense;