# Mini Expense Tracker

A full-stack expense management application built using React, Node.js, Express.js, and SQLite.

The application helps users track daily expenses, organize spending by category, analyze expenditure patterns, and gain insights through summaries and visualizations. It provides a simple and intuitive interface for managing personal expenses while demonstrating modern full-stack development practices.

This project is being developed as part of the Studio Graphene Associate Software Engineer Assessment.

---

## Features

### Expense Management

* Add new expenses
* View all expenses
* Edit existing expenses
* Delete expenses
* Store expense amount, category, date, and notes
* Persistent data storage using SQLite

### Filtering and Search

* Filter expenses by category
* Filter expenses by date range
* Combine multiple filters
* Clear and reset filters

### Analytics and Reporting

* Total spending summary
* Highest expense tracking
* Average expense calculation
* Category-wise spending totals
* Recent expenses overview
* Expense distribution visualization
* Spending insights dashboard

### Data Validation

* Amount must be greater than zero
* Category selection validation
* Date validation
* Prevention of future dates
* Client-side validation
* Server-side validation

### User Experience

* Responsive user interface
* Currency formatting
* Loading states
* Error handling
* Confirmation dialogs for destructive actions
* Clean and intuitive design

### Data Visualization

* Category-wise expense charts
* Spending distribution graphs
* Summary cards and statistics

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Recharts
* CSS

### Backend

* Node.js
* Express.js

### Database

* SQLite
* Better-SQLite3

### Development Tools

* Git
* GitHub
* Postman
* Visual Studio Code
* Nodemon

---

## Backend Architecture

The backend follows a modular architecture based on separation of concerns. Each layer is responsible for a specific aspect of the application, making the codebase easier to maintain, extend, and test.

```text
server/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── database/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── expense-tracker.db
```

### Controllers

Controllers handle incoming HTTP requests, execute business logic, interact with the database, and return structured responses.

Implemented controllers:

* Create Expense
* Get Expenses
* Update Expense
* Delete Expense
* Expense Summary

### Middleware

Validation middleware ensures that only valid data reaches the application logic.

Implemented validation:

* Required field validation
* Positive amount validation
* Category validation
* Date validation
* Future date restriction

Separate middleware is used for:

* Expense Creation
* Expense Updates

### Database Layer

SQLite is used as the application's persistence layer because it is lightweight, fast, and easy to set up.

The database stores:

* Expense Amount
* Category
* Date
* Notes
* Creation Timestamp
* Update Timestamp

---

## Database Schema

### Expenses Table

| Column     | Type     | Description           |
| ---------- | -------- | --------------------- |
| id         | INTEGER  | Primary Key           |
| amount     | REAL     | Expense Amount        |
| category   | TEXT     | Expense Category      |
| date       | TEXT     | Expense Date          |
| note       | TEXT     | Optional Description  |
| created_at | DATETIME | Creation Timestamp    |
| updated_at | DATETIME | Last Update Timestamp |

---

## REST API Endpoints

### Create Expense

```http
POST /api/expenses
```

Creates a new expense record.

### Get All Expenses

```http
GET /api/expenses
```

Returns all stored expenses.

### Filter By Category

```http
GET /api/expenses?category=Food
```

Returns expenses belonging to a specific category.

### Filter By Date Range

```http
GET /api/expenses?startDate=2026-06-01&endDate=2026-06-30
```

Returns expenses within the selected date range.

### Combined Filtering

```http
GET /api/expenses?category=Food&startDate=2026-06-01&endDate=2026-06-30
```

Returns expenses matching multiple filter conditions.

### Update Expense

```http
PUT /api/expenses/:id
```

Updates an existing expense.

### Delete Expense

```http
DELETE /api/expenses/:id
```

Deletes an expense record.

### Expense Summary

```http
GET /api/expenses/summary
```

Returns:

* Total Expenses
* Highest Expense
* Average Expense
* Category Breakdown
* Recent Expenses

---

## Project Structure

```text
mini-expense-tracker/
│
├── client/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── database/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── expense-tracker.db
│
├── README.md
│
└── .gitignore
```

---

## Current Development Status

### Completed

* Project initialization
* Git repository setup
* Express server configuration
* SQLite database integration
* Expense database schema creation
* CRUD API implementation
* Validation middleware
* Category filtering
* Date range filtering
* Expense analytics
* Summary reporting APIs
* GitHub integration

### In Progress

* Backend API testing
* Edge case validation
* Postman collection creation

### Upcoming

* React frontend implementation
* Expense management interface
* Dashboard development
* Charts and visualizations
* Responsive UI design
* Deployment

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Start Backend Server

```bash
npm run dev
```

Backend server runs on:

```text
http://localhost:5000
```

### Frontend Setup

Frontend implementation is currently under development and will be added in upcoming commits.

---

## Design Principles

This project emphasizes:

* Clean Architecture
* Modular Design
* Scalability
* Maintainability
* Separation of Concerns
* RESTful API Design
* Data Validation
* User Experience
* Production-Oriented Development Practices

The goal is not only to satisfy the assignment requirements but also to demonstrate software engineering principles that can be applied in real-world applications.

---

## Author

**Kartikey Sharma**

B.Tech Computer Science and Engineering

Graphic Era University, Dehradun
