# PayTrack Frontend

Frontend application for **PayTrack – Smart Expense Analytics Dashboard**.

Built using React, Vite, Axios, and Recharts, the frontend provides a modern, responsive dashboard for expense tracking, analytics, filtering, and visualization.

---

# Overview

The PayTrack frontend is responsible for:

* User interaction
* Expense management
* Dashboard rendering
* Analytics visualization
* CSV export functionality
* Responsive user experience

It communicates with the Express.js backend through REST APIs and displays real-time expense insights.

---

# Features

## Expense Management

* Add new expenses
* Edit existing expenses
* Delete expenses
* View expense history

## Dashboard Analytics

* Total Expenses
* Highest Expense
* Average Expense
* Active Categories

## Data Visualization

* Expense Distribution Pie Chart
* Category Comparison Bar Chart
* Monthly Spending Trends
* Recent Activity Timeline

## Filtering

* Filter by Category
* Filter by Date Range
* Combined Filters
* Reset Filters

## CSV Export

* Export all expenses
* Export filtered expenses
* Spreadsheet-friendly format

## User Experience

* Responsive Design
* Mobile Friendly
* Tablet Friendly
* Loading Skeletons
* Toast Notifications
* Empty States
* Error Handling
* Retry Mechanisms

---

# Technology Stack

## Core Framework

* React
* Vite

## API Communication

* Axios

## Charts and Analytics

* Recharts

## Styling

* CSS3

---

# Frontend Architecture

```text
src/
│
├── api/
│   └── expenseApi.js
│
├── components/
│   ├── Charts/
│   ├── ExpenseForm/
│   ├── ExpenseList/
│   ├── Filters/
│   ├── Insights/
│   ├── RecentTimeline/
│   ├── SummaryCards/
│   ├── Toast/
│   └── EmptyState/
│
├── pages/
│   └── Dashboard.jsx
│
├── utils/
│
├── App.jsx
└── main.jsx
```

---

# Component Overview

## ExpenseForm

Handles:

* Expense creation
* Input validation
* Form submission

## ExpenseList

Handles:

* Expense display
* Expense editing
* Expense deletion

## Filters

Handles:

* Category filtering
* Date range filtering
* Filter reset functionality

## Charts

Provides:

* Pie Chart
* Bar Chart
* Monthly Trend Chart

## SummaryCards

Displays:

* Total Expenses
* Highest Expense
* Average Expense
* Active Categories

## RecentTimeline

Displays recent transactions in chronological order.

## InsightsPanel

Provides spending insights and analytics summaries.

---

# API Integration

The frontend communicates with the backend using Axios.

Implemented API operations:

* Get Expenses
* Create Expense
* Update Expense
* Delete Expense
* Get Expense Summary

Base URL:

```javascript
http://localhost:5000/api
```

---

# State Management

React Hooks are used throughout the application.

Implemented hooks:

* useState
* useEffect
* useMemo
* useCallback

These manage:

* Dashboard state
* Loading state
* Error state
* Filters
* Analytics data

---

# Validation

## Client-Side Validation

Implemented validations:

* Required Fields
* Positive Amount
* Category Selection
* Date Validation
* Future Date Prevention

Validation occurs before API requests are sent.

---

# Responsive Design

The application is optimized for:

* Desktop
* Laptop
* Tablet
* Mobile

Responsive testing was performed using Chrome Developer Tools.

---

# Installation

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Application runs at:

```text
http://localhost:5173
```

---

# Build for Production

Generate production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Testing

Manual testing completed for:

* Expense Creation
* Expense Editing
* Expense Deletion
* Filtering
* Analytics
* CSV Export
* Responsive Design
* Validation

---

# Learning Outcomes

Through developing the PayTrack frontend, I gained practical experience in:

* React Component Architecture
* API Integration
* State Management
* Data Visualization
* Responsive Design
* Frontend Validation
* Reusable Component Design
* Dashboard Development
* User Experience Design

---

# Status

✅ Frontend Development Completed

✅ Analytics Dashboard Completed

✅ Responsive Testing Completed

✅ Manual Testing Completed
