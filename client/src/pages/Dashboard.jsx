import { useCallback, useEffect, useMemo, useState } from 'react';
import { getExpenseSummary, getExpenses } from '../api/expenseApi';
import SummaryCards from '../components/SummaryCards/SummaryCards';
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import ExpenseList from '../components/ExpenseList/ExpenseList';
import './Dashboard.css';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [expenseCount, setExpenseCount] = useState(0);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentDate = useMemo(
    () =>
      new Intl.DateTimeFormat('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    [],
  );

  const fetchDashboardData = useCallback(async () => {
    setSummaryLoading(true);
    setError(null);

    try {
      const [summaryData, expensesData] = await Promise.all([
        getExpenseSummary(),
        getExpenses(),
      ]);

      if (summaryData.success) {
        setSummary(summaryData);
      } else {
        setError(summaryData.message || 'Failed to load expense summary.');
      }

      if (expensesData.success) {
        setExpenseCount(expensesData.count ?? expensesData.data?.length ?? 0);
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Unable to connect to the server. Please ensure the backend is running.';

      setError(message);
    } finally {
      setSummaryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="dashboard">
      <section className="dashboard-hero" aria-label="Dashboard overview">
        <div className="dashboard-hero__glow dashboard-hero__glow--one" aria-hidden="true" />
        <div className="dashboard-hero__glow dashboard-hero__glow--two" aria-hidden="true" />
        <div className="dashboard-hero__grid" aria-hidden="true" />

        <div className="dashboard-hero__content">
          <div className="dashboard-hero__badges">
            <span className="dashboard-hero__badge">
              <span className="dashboard-hero__badge-dot" aria-hidden="true" />
              Live Dashboard
            </span>
            <span className="dashboard-hero__badge dashboard-hero__badge--muted">
              {currentDate}
            </span>
          </div>

          <h1 className="dashboard-hero__title">Expense Tracker Dashboard</h1>
          <p className="dashboard-hero__description">
            Manage, analyze and monitor your spending from a single intelligent
            dashboard.
          </p>

          <div className="dashboard-hero__stats">
            <div className="dashboard-hero__stat">
              <span className="dashboard-hero__stat-value">
                {summaryLoading ? '—' : expenseCount}
              </span>
              <span className="dashboard-hero__stat-label">Total Expenses Recorded</span>
            </div>
            <div className="dashboard-hero__stat-divider" aria-hidden="true" />
            <div className="dashboard-hero__stat">
              <span className="dashboard-hero__stat-value">
                {summaryLoading
                  ? '—'
                  : summary?.categoryBreakdown?.length ?? 0}
              </span>
              <span className="dashboard-hero__stat-label">Active Categories</span>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="dashboard__alert" role="alert">
          <div className="dashboard__alert-content">
            <svg
              className="dashboard__alert-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
          </div>
          <button type="button" className="dashboard__alert-btn" onClick={fetchDashboardData}>
            Retry
          </button>
        </div>
      )}

      <SummaryCards summary={summary} loading={summaryLoading} />

      <div className="dashboard__main-grid">
        <section className="dashboard-panel dashboard-panel--form">
          <div className="dashboard-panel__header">
            <h2 className="dashboard-panel__title">Add Expense</h2>
            <p className="dashboard-panel__subtitle">Record a new transaction</p>
          </div>
          <ExpenseForm onExpenseCreated={fetchDashboardData} />
        </section>

        <section className="dashboard-panel dashboard-panel--chart">
          <div className="dashboard-panel__header">
            <h2 className="dashboard-panel__title">Expense Breakdown</h2>
            <p className="dashboard-panel__subtitle">Category-wise spending</p>
          </div>
          <p className="dashboard__placeholder-text">Pie chart coming next</p>
        </section>
      </div>

      <section className="dashboard-panel dashboard-panel--toolbar">
        <div className="dashboard-panel__header">
          <h2 className="dashboard-panel__title">Filters</h2>
          <p className="dashboard-panel__subtitle">Refine your expense view</p>
        </div>
        <p className="dashboard__placeholder-text">Filter toolbar coming next</p>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel__header">
          <h2 className="dashboard-panel__title">All Expenses</h2>
          <p className="dashboard-panel__subtitle">Manage your transactions</p>
        </div>
        <ExpenseList onExpenseChanged={fetchDashboardData} />
      </section>

      <div className="dashboard__analytics-grid">
        <section className="dashboard-panel">
          <div className="dashboard-panel__header">
            <h2 className="dashboard-panel__title">Category Distribution</h2>
            <p className="dashboard-panel__subtitle">Spending by category</p>
          </div>
          <p className="dashboard__placeholder-text">Analytics pie chart coming next</p>
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel__header">
            <h2 className="dashboard-panel__title">Spending Comparison</h2>
            <p className="dashboard-panel__subtitle">Category totals at a glance</p>
          </div>
          <p className="dashboard__placeholder-text">Bar chart coming next</p>
        </section>
      </div>

      <section className="dashboard-panel">
        <div className="dashboard-panel__header">
          <h2 className="dashboard-panel__title">Recent Activity</h2>
          <p className="dashboard-panel__subtitle">Your latest transactions</p>
        </div>
        <p className="dashboard__placeholder-text">Timeline coming next</p>
      </section>
    </div>
  );
}

export default Dashboard;
