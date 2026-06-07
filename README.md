# PayTrack – Smart Expense Analytics Dashboard

### Live Demo

🔗 **Frontend:** [Add Vercel/Netlify Link Here]

🔗 **Backend API:** [Add Render/Railway Link Here]

🔗 **GitHub Repository:** https://github.com/Kartikey07Sharma/mini-expense-tracker

---

# Overview

PayTrack is a full-stack expense management and analytics platform built using React, Node.js, Express.js, and SQLite.

The application enables users to record daily expenses, organize spending by category, analyze financial habits, visualize spending trends, and export expense records. It provides a modern SaaS-inspired dashboard experience while demonstrating full-stack software engineering concepts including RESTful API design, clean architecture, reusable React components, data visualization, responsive design, validation, and state management.

This project was developed as part of the Studio Graphene Associate Software Engineer Assessment.

---

# Key Features

## Expense Management

* Add new expenses
* View all expenses
* Edit existing expenses
* Delete expenses
* Store amount, category, date, and notes
* Persistent SQLite storage

## Expense Filtering

* Filter by category
* Filter by date range
* Combined filters
* Clear filters
* Dynamic dashboard updates

## Analytics Dashboard

* Total Expenses KPI
* Highest Expense KPI
* Average Expense KPI
* Active Categories Counter
* Category-wise Expense Breakdown
* Recent Activity Timeline
* Spending Insights Panel
* Real-time Dashboard Updates

## Data Visualization

* Interactive Pie Chart
* Interactive Bar Chart
* Monthly Trend Analysis
* Category Comparison
* Spending Distribution Analytics

## CSV Export

* Export expense records
* Export filtered records
* Spreadsheet-compatible format
* One-click download

## User Experience

* Responsive Design
* Mobile-Friendly Interface
* Tablet-Friendly Layout
* Loading Skeletons
* Toast Notifications
* Empty States
* Error Handling
* Retry Mechanisms
* Modern SaaS Dashboard UI

## Data Validation

### Frontend Validation

* Required field validation
* Positive amount validation
* Category validation
* Date validation
* Future date prevention

### Backend Validation

* Middleware-based validation
* Positive amount checks
* Category validation
* Date validation
* Future date prevention
* API error handling

---

# Technology Stack

## Frontend

* React
* Vite
* Axios
* Recharts
* CSS3

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
* Nodemon
* Visual Studio Code

---

# System Architecture

## Frontend Structure

client/
├── src/
│ ├── api/
│ ├── components/
│ │ ├── Charts/
│ │ ├── ExpenseForm/
│ │ ├── ExpenseList/
│ │ ├── Filters/
│ │ ├── Insights/
│ │ ├── RecentTimeline/
│ │ ├── SummaryCards/
│ │ ├── Toast/
│ │ └── EmptyState/
│ ├── pages/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx

## Backend Structure

server/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── database/
│ ├── services/
│ ├── utils/
│ ├── app.js
│ └── server.js

---

# Database Schema

## Expenses Table

| Column     | Type     | Description        |
| ---------- | -------- | ------------------ |
| id         | INTEGER  | Primary Key        |
| amount     | REAL     | Expense Amount     |
| category   | TEXT     | Expense Category   |
| date       | TEXT     | Expense Date       |
| note       | TEXT     | Optional Notes     |
| created_at | DATETIME | Creation Timestamp |
| updated_at | DATETIME | Update Timestamp   |

---

# REST API Endpoints

### Create Expense

POST /api/expenses

### Get Expenses

GET /api/expenses

### Filter Expenses

GET /api/expenses?category=Food

GET /api/expenses?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD

### Update Expense

PUT /api/expenses/:id

### Delete Expense

DELETE /api/expenses/:id

### Expense Summary

GET /api/expenses/summary

Returns:

* Total Expenses
* Highest Expense
* Average Expense
* Category Breakdown
* Recent Expenses

---

# Application Workflow

1. User enters expense information.
2. React form validates input.
3. Axios sends request to Express API.
4. Middleware validates incoming data.
5. Expense is stored in SQLite.
6. Dashboard refreshes automatically.
7. Analytics update instantly.
8. Charts and KPIs reflect latest data.
9. Users can export records to CSV.

---

# Testing

## Manual Testing Completed

### Desktop Testing

* Expense Creation
* Expense Editing
* Expense Deletion
* Filtering
* Analytics
* CSV Export
* Insights Panel

### Tablet Testing

* Responsive Layout
* Chart Responsiveness
* Form Validation

### Mobile Testing

* Dashboard Responsiveness
* Mobile Form Layout
* Table Scrolling
* Chart Rendering

### Validation Testing

* Empty Fields
* Invalid Amounts
* Future Date Restriction
* Backend Validation
* API Error Handling

All tests passed successfully.

---

# Screenshots

## Dashboard

(Add Screenshot)

## Analytics

(Add Screenshot)

## Mobile View

(Add Screenshot)

---

# Installation

## Clone Repository

git clone <repository-url>

## Backend Setup

cd server

npm install

npm run dev

Backend:

http://localhost:5000

## Frontend Setup

cd client

npm install

npm run dev

Frontend:

http://localhost:5173

---

# Future Enhancements

* User Authentication
* Multi-user Accounts
* Budget Goals
* PDF Reports
* Expense Forecasting
* Cloud Database Migration
* Dark/Light Theme Toggle

---

# Project Status

✅ Backend Development Completed

✅ Frontend Development Completed

✅ CRUD Operations Completed

✅ Analytics Dashboard Completed

✅ Charts and Visualizations Completed

✅ CSV Export Completed

✅ Validation Completed

✅ Responsive Design Completed

✅ Mobile Testing Completed

✅ Tablet Testing Completed

✅ Manual Testing Completed

✅ GitHub Repository Updated

# Learning Outcomes

Developing PayTrack provided hands-on experience across the complete software development lifecycle, from planning and architecture design to implementation, testing, and deployment preparation.

Through this project, I gained practical knowledge in:

## Frontend Development

- Building reusable React components
- Managing application state using React Hooks
- API integration using Axios
- Creating responsive user interfaces
- Form handling and validation
- Data visualization using Recharts
- Component-based architecture design

## Backend Development

- Designing RESTful APIs using Express.js
- Implementing CRUD operations
- Middleware development and validation
- Request and response handling
- Error handling and debugging
- Backend architecture organization

## Database Management

- SQLite database design
- Database schema creation
- SQL query writing
- Data filtering and aggregation
- Database integration with Node.js

## Software Engineering Practices

- Clean code principles
- Modular architecture
- Separation of concerns
- Reusable component design
- Version control using Git and GitHub
- Project documentation

## Testing and Debugging

- Manual testing of application workflows
- Validation testing
- Responsive design testing
- API testing using Postman
- Debugging frontend and backend issues
- Fixing timezone and date validation problems

## Full Stack Development

- End-to-end application development
- Frontend and backend communication
- State synchronization
- Real-time dashboard updates
- Data analytics implementation
- Production-ready application structure

This project significantly improved my understanding of modern full-stack web development and strengthened my ability to design, build, test, and maintain scalable software applications.
---

# Author

Kartikey Sharma

B.Tech Computer Science and Engineering

Graphic Era University, Dehradun
