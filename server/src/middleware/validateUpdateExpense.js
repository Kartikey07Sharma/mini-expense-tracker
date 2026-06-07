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
    const today = new Date();

    const todayString =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    console.log("Update Date:", date);
    console.log("Today String:", todayString);

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