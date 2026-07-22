require("dotenv").config();

// Initialize MySQL Connection
require("./database/db");

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});