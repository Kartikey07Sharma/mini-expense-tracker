# PayTrack – Smart Expense Analytics Dashboard

## Project Title & Brief Description

PayTrack is a full-stack expense tracking and analytics application built as a solution for **Exercise 2: Mini Expense Tracker** from the Studio Graphene Full Stack Developer Assessment.

The application allows users to record daily expenses, categorize spending, edit and delete transactions, apply filters, analyze spending patterns through charts and KPIs, and export records as CSV files. The project demonstrates full-stack development concepts including REST API design, frontend-backend integration, MySQL database management, data visualization, validation, responsive UI design, and deployment.

---

# Live Demo Links

### Frontend

https://mini-expense-tracker-chi.vercel.app

### Backend API

https://paytrack-api-8313.onrender.com

### GitHub Repository

https://github.com/Kartikey07Sharma/mini-expense-tracker

---

# Tech Stack

## Frontend

### React

Used for building reusable UI components and managing application state.

### Vite

Provides a fast development environment and optimized production builds.

### Axios

Used for API communication between frontend and backend.

### Recharts

Used for pie charts, bar charts, and spending trend visualization.

### CSS3

Used for custom styling and responsive layouts.

---

## Backend

### Node.js

JavaScript runtime for server-side development.

### Express.js

Used for building RESTful APIs and middleware handling.

---

## Database

### MySQL

A robust relational database management system used for storing and managing expense records with reliable data persistence and efficient query performance.

### mysql2

A modern Node.js MySQL driver that provides efficient database connectivity with Promise support, enabling asynchronous CRUD operations and connection pooling.

---

## Development Tools

* Git
* GitHub
* Postman
* Nodemon
* Visual Studio Code

---

# System Architecture

Client (React)
↓
Axios API Requests
↓
Express REST API
↓
Validation Middleware
↓
Controller Layer
↓
MYSQL Database

### Architecture Flow

1. User interacts with React UI.
2. Axios sends requests to backend APIs.
3. Validation middleware verifies request data.
4. Controllers process business logic.
5. SQLite stores or retrieves expense data.
6. Response is returned to frontend.
7. Dashboard updates automatically.

---

# How to Run Locally

## Clone Repository

git clone https://github.com/Kartikey07Sharma/mini-expense-tracker.git

cd mini-expense-tracker

---

## Backend Setup

cd server

npm install

npm run dev

Backend will start on:

http://localhost:5000

---

## Frontend Setup

Open another terminal:

cd client

npm install

npm run dev

Frontend will start on:

http://localhost:5173

---

# API Documentation

## Base URL

http://localhost:5000/api

---

## 1. Create Expense

### POST /expenses

Request Body

```json
{
  "amount": 250,
  "category": "Food",
  "date": "2026-06-08",
  "note": "Lunch"
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": 1
  }
}
```

---

## 2. Get All Expenses

### GET /expenses

Response

```json
{
  "success": true,
  "data": [...]
}
```

---

## 3. Filter Expenses

### GET /expenses

Query Parameters

```text
?category=Food

?startDate=2026-06-01&endDate=2026-06-30
```

Response

```json
{
  "success": true,
  "data": [...]
}
```

---

## 4. Update Expense

### PUT /expenses/:id

Request Body

```json
{
  "amount": 300,
  "category": "Food",
  "date": "2026-06-08",
  "note": "Dinner"
}
```

Response

```json
{
  "success": true,
  "message": "Expense updated successfully"
}
```

---

## 5. Delete Expense

### DELETE /expenses/:id

Response

```json
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

---

## 6. Expense Summary

### GET /expenses/summary

Response

```json
{
  "success": true,
  "data": {
    "totalExpenses": 4611,
    "highestExpense": 1222,
    "averageExpense": 576.38,
    "categoryBreakdown": [],
    "recentExpenses": []
  }
}
```

---

# Project Structure

```text
mini-expense-tracker
│
├── client
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public
│
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middleware
│   │   ├── database
│   │   ├── services
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│
├── screenshots
│
└── README.md
```

---

# Challenges Faced & Solutions

## 1. Timezone Validation Issue

### Challenge

While editing expenses in production, valid dates were incorrectly flagged as future dates.

### Solution

Implemented timezone-safe date comparison using local date strings instead of direct Date object comparisons.

---

## 2. Frontend and Backend Deployment Integration

### Challenge

The deployed frontend initially failed to communicate with the deployed backend.

### Solution

Configured environment-specific API URLs and redeployed both services to ensure proper connectivity.

---

## 3. Category Visualization Confusion

### Challenge

Multiple chart categories used similar color shades, making charts difficult to interpret.

### Solution

Implemented meaningful category-specific colors:

* Food → Red
* Transport → Blue
* Shopping → Orange
* Entertainment → Purple
* Bills → Brown
* Health → Green
* Education → Pink
* Other → Gray

---

## 4. Mobile Responsiveness

### Challenge

Charts and tables required optimization for smaller screens.

### Solution

Used responsive layouts, scrollable tables, and adaptive chart containers for mobile compatibility.

---

# Future Improvements

Given more time, I would add:

* User Authentication and Authorization
* Multi-user Expense Tracking
* Budget Planning per Category
* Spending Limit Alerts
* PDF Report Generation
* Recurring Expense Management
* Expense Forecasting and Predictions
* Cloud Database Migration (PostgreSQL)
* Dark / Light Theme Toggle
* Automated Testing using Jest and React Testing Library

---

# Next Steps

The current version focuses on fulfilling all core requirements and several bonus features including analytics dashboards, responsive design, MYSQL persistence, CSV export, and interactive visualizations.

The next development phase would focus on:

1. Authentication System
2. Budget Management Module
3. Advanced Reporting
4. Cloud Database Support
5. Enhanced Analytics and Forecasting

---

# Project Goals

The primary objective of PayTrack is to provide a simple yet powerful expense management solution that enables users to:

- Track daily expenses efficiently
- Categorize spending habits
- Analyze spending trends visually
- Filter expenses across custom date ranges
- Gain actionable financial insights
- Export expense records for external analysis

The project was designed to demonstrate full-stack development skills including frontend architecture, REST API design, database management, data visualization, validation, responsive design, deployment, and documentation.

---

# Design Decisions

Several design decisions were made during development to keep the application simple, maintainable, and scalable.

## Why React?

React was chosen because of its component-based architecture and efficient state management through hooks.

## Why Express?

Express provides a lightweight and flexible framework for creating RESTful APIs while keeping the codebase easy to understand.

## Why MySQL?

MySQL was selected because:

- Reliable and scalable relational database for production applications
- Supports multiple concurrent users and efficient data management
- Provides better performance and security than file-based databases
- Widely used in the industry, making it suitable for real-world development

## Why Recharts?

Recharts offers responsive and customizable charts with minimal configuration, making it suitable for analytics dashboards.

---

---

# Core Features

## Expense Management

- Create expense records
- Update existing expenses
- Delete expenses
- Store amount, category, date, and notes

## Analytics Dashboard

- Total spending overview
- Highest expense tracking
- Average expense calculation
- Category-wise analysis
- Recent activity timeline

## Data Visualization

- Interactive Pie Chart
- Category Comparison Bar Chart
- Monthly Spending Trend Graph

## Filtering System

- Category filtering
- Date range filtering
- Combined filters
- Dynamic dashboard refresh

## Data Export

- Export visible records to CSV format

---

---

# Validation and Data Integrity

The application implements validation at both frontend and backend layers.

## Frontend Validation

- Required field validation
- Positive amount validation
- Category selection validation
- Future date prevention

## Backend Validation

- Middleware-based validation
- Request sanitization
- Positive amount enforcement
- Date verification
- Error handling and response standardization

This dual-layer validation approach prevents invalid data from reaching the database.

---


---

# Performance Optimizations

Several optimizations were implemented to improve user experience:

- Reusable React components
- Responsive chart rendering
- Loading skeleton placeholders
- API abstraction through Axios
- Optimized SQL queries
- Dynamic filtering without page reloads
- Efficient dashboard refresh after CRUD operations

---

---

# Challenges Faced and Solutions

## Challenge 1: Date Validation Across Timezones

### Problem

During production deployment, editing expenses occasionally triggered a "Future dates are not allowed" error even when the selected date was valid.

### Root Cause

JavaScript Date objects behave differently depending on timezone settings. The deployed environment and local environment were interpreting dates differently.

### Solution

Implemented timezone-safe string-based date comparison and updated validation middleware to ensure consistent behavior across all environments.

---

## Challenge 2: Frontend and Backend Integration

### Problem

The deployed frontend initially failed to connect to the deployed backend API.

### Solution

Configured environment-specific API URLs and redeployed both services with proper production configuration.

---

## Challenge 3: Chart Readability

### Problem

Multiple categories were displayed using visually similar colors, making charts difficult to interpret.

### Solution

Introduced category-specific semantic colors to improve readability and user experience.

---

## Challenge 4: Responsive Design

### Problem

Tables and charts required optimization for mobile devices.

### Solution

Implemented responsive layouts, adaptive chart containers, and scrollable table sections.

---

---

# Future Improvements

If given additional development time, the following features would be implemented:

## User Authentication

- User registration
- Login and logout
- JWT authentication

## Budget Planning

- Monthly budgets
- Category-specific budgets
- Budget utilization tracking

## Notifications

- Budget limit alerts
- Monthly spending reminders

## Advanced Analytics

- Expense forecasting
- Trend prediction
- Spending recommendations

## Reports

- PDF generation
- Monthly reports
- Yearly summaries

## Database Improvements

- PostgreSQL migration
- Database indexing
- Backup and recovery support

## Testing

- Unit testing
- Integration testing
- End-to-end testing

## Accessibility

- Keyboard navigation
- Screen reader support
- Improved accessibility compliance

---

---

# Lessons Learned

Developing PayTrack provided practical experience in:

- Designing RESTful APIs
- Building reusable React components
- Managing application state
- MYSQL database integration
- Data visualization using Recharts
- Deployment using Vercel and Render
- Debugging production issues
- Responsive UI development
- Git and GitHub workflows
- Technical documentation

The project significantly improved my understanding of full-stack application architecture and production deployment workflows.

---


# Author

Kartikey Sharma

B.Tech Computer Science and Engineering

Graphic Era University, Dehradun
