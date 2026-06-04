const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../../expense-tracker.db");

const db = new Database(dbPath);

db.exec(`  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

console.log("✅ SQLite database connected");

module.exports = db;
