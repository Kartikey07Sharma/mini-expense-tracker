# Mini Expense Tracker

A full-stack expense management application built using React, Node.js, Express.js, and SQLite.

The application helps users track daily expenses, organize spending by category, analyze expenditure patterns, and gain insights through summaries and visualizations. It provides a modern dashboard interface for managing personal finances while demonstrating full-stack software engineering practices, clean architecture principles, and responsive user experience design.

This project is being developed as part of the Studio Graphene Associate Software Engineer Assessment.

---

# Features

## Expense Management

* Add new expenses
* View all expenses
* Edit existing expenses
* Delete expenses
* Store expense amount, category, date, and notes
* Persistent data storage using SQLite

## Filtering and Search

* Filter expenses by category
* Filter expenses by date range
* Combine multiple filters
* Clear and reset filters

## Analytics and Reporting

* Total spending summary
* Highest expense tracking
* Average expense calculation
* Category-wise spending totals
* Recent expenses overview
* Expense distribution visualization
* Spending insights dashboard

## Data Validation

* Amount must be greater than zero
* Category validation
* Date validation
* Prevention of future dates
* Client-side validation
* Server-side validation

## User Experience

* Responsive user interface
* Currency formatting
* Loading states
* Error handling
* Retry mechanisms
* Confirmation dialogs
* Modern SaaS-inspired dashboard

## Data Visualization

* Category-wise expense charts
* Spending distribution graphs
* Summary cards and statistics
* Interactive dashboard analytics

---

# Tech Stack

## Frontend

* React
* Vite
* Axios
* Recharts
* CSS

## Backend

* Node.js
* Express.js

## Database

* SQLite
* Better-SQLite3

## Development Tools

* Git
* GitHub
* Postman
* Visual Studio Code
* Nodemon

---

# Backend Architecture

The backend follows a modular architecture based on separation of concerns. Each layer is responsible for a specific responsibility, making the application easier to maintain, test, and scale.

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

## Controllers

Controllers manage incoming HTTP requests and return structured responses.

Implemented controllers:

* Create Expense
* Get Expenses
* Update Expense
* Delete Expense
* Expense Summary

## Middleware

Validation middleware ensures only valid data reaches the application logic.

Implemented validation:

* Required field validation
* Positive amount validation
* Category validation
* Date validation
* Future date restriction

Separate validation middleware:

* Expense Creation Validation
* Expense Update Validation

## Database Layer

SQLite is used as the application's persistence layer.

Stored information:

* Expense Amount
* Category
* Date
* Notes
* Creation Timestamp
* Update Timestamp

---

# Database Schema

## Expenses Table

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

# REST API Endpoints

## Create Expense

```http
POST /api/expenses
```

Creates a new expense record.

## Get All Expenses

```http
GET /api/expenses
```

Returns all stored expenses.

## Filter By Category

```http
GET /api/expenses?category=Food
```

Returns expenses belonging to a specific category.

## Filter By Date Range

```http
GET /api/expenses?startDate=2026-06-01&endDate=2026-06-30
```

Returns expenses within a specified date range.

## Combined Filtering

```http
GET /api/expenses?category=Food&startDate=2026-06-01&endDate=2026-06-30
```

Returns expenses matching multiple filter conditions.

## Update Expense

```http
PUT /api/expenses/:id
```

Updates an existing expense.

## Delete Expense

```http
DELETE /api/expenses/:id
```

Deletes an expense record.

## Expense Summary

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

# Frontend Development Progress

## Dashboard Foundation Completed

The frontend has been initialized using React and Vite.

A modern SaaS-inspired dashboard architecture has been created with emphasis on scalability, maintainability, responsiveness, and user experience.

## Implemented Features

### Dashboard Layout

* Responsive dashboard structure
* Gradient hero section
* Dashboard overview section
* Modern SaaS-inspired design
* Mobile-friendly layout

### Summary Cards

* Total Expenses card
* Highest Expense card
* Average Expense card
* Loading skeleton states
* Currency formatting support
* Responsive card grid

### API Integration Layer

A centralized Axios service layer has been implemented.

Supported operations:

* Fetch all expenses
* Create expense
* Update expense
* Delete expense
* Fetch expense summary

### State Management

* Dashboard data fetching
* Loading state handling
* Error handling
* Retry functionality
* Concurrent API requests using Promise.all()

### User Experience Enhancements

* Loading skeleton animations
* Error alert system
* Retry mechanism
* Responsive dashboard cards
* Hover animations
* Glassmorphism-inspired card design

---

# Current Frontend Architecture

```text
client/
│
├── src/
│   ├── api/
│   │   └── expenseApi.js
│   │
│   ├── components/
│   │   └── SummaryCards/
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── styles/
│   │
│   ├── App.jsx
│   └── main.jsx
```

---

# Project Structure

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

# Current Development Status

## Completed

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
* Backend API testing using Postman
* Frontend dashboard foundation
* API integration layer
* Summary cards implementation
* GitHub integration

## In Progress

* Expense Creation Form
* Expense Filtering Interface
* Expense Table Component
* Analytics Charts Integration
* Recent Activity Timeline

## Upcoming

* Expense editing workflow
* Expense deletion workflow
* Advanced analytics dashboard
* Final UI polish
* Responsive testing
* Deployment

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Install Backend Dependencies

```bash
cd server
npm install
```

## Start Backend Server

```bash
npm run dev
```

Backend Server:

```text
http://localhost:5000
```

## Install Frontend Dependencies

```bash
cd client
npm install
```

## Start Frontend Development Server

```bash
npm run dev
```

Frontend Server:

```text
http://localhost:5173
```

---

# Application Screenshots

## Dashboard

Screenshots will be added after frontend implementation is completed.

## Analytics

Analytics and chart screenshots will be added after chart integration.

---

# Design Principles

This project emphasizes:

* Clean Architecture
* Modular Design
* Scalability
* Maintainability
* Separation of Concerns
* RESTful API Design
* Data Validation
* Responsive User Experience
* Production-Oriented Development Practices

The goal is not only to satisfy the assignment requirements but also to demonstrate software engineering principles that can be applied in real-world applications.

---

# Author

**Kartikey Sharma**

B.Tech Computer Science and Engineering

Graphic Era University, Dehradun
