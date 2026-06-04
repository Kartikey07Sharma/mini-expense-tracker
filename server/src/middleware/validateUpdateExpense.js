const validateUpdateExpense = (req, res, next) => {
  const { amount, category, date } = req.body;

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

  if (
    amount !== undefined &&
    amount <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Amount must be greater than zero"
    });
  }

  if (
    category !== undefined &&
    category.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Category cannot be empty"
    });
  }

  if (date) {
    const expenseDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (expenseDate > today) {
      return res.status(400).json({
        success: false,
        message: "Future dates are not allowed"
      });
    }
  }

  next();
};

module.exports = validateUpdateExpense;