const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Expense Tracker API Running"
  });
});

module.exports = app;