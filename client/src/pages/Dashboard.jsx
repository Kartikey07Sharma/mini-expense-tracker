import { useCallback, useEffect, useMemo, useState } from 'react';
import { getExpenseSummary, getExpenses } from '../api/expenseApi';
import SummaryCards from '../components/SummaryCards/SummaryCards';
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import ExpenseList from '../components/ExpenseList/ExpenseList';
import Filters from '../components/Filters/Filters';
import ExpensePieChart from '../components/Charts/ExpensePieChart';
import ExpenseBarChart from '../components/Charts/ExpenseBarChart';
import MonthlyTrendChart from '../components/Charts/MonthlyTrendChart';
import RecentTimeline from '../components/RecentTimeline/RecentTimeline';
import InsightsPanel from '../components/Insights/InsightsPanel';
import { useToast } from '../components/Toast/Toast';
import { exportExpensesToCsv } from '../utils/exportCsv';
import {
  INITIAL_FILTERS,
  buildApiFilters,
  buildCategoryBreakdown,
  buildFilteredInsights,
  buildGlobalInsights,
  buildMonthlyTrend,
  getRecentExpenses,
  hasActiveFilters,
} from '../utils/expenseUtils';
import './Dashboard.css';

function Dashboard() {
  const { showToast } = useToast();
  const [summary, setSummary] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [totalTransactionCount, setTotalTransactionCount] = useState(0);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [loading, setLoading] = useState(true);
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

  const fetchDashboardData = useCallback(async (activeFilters = filters, silent = false) => {
    if (!silent) {
      setLoading(true);
    }

    setError(null);

    try {
      const apiFilters = buildApiFilters(activeFilters);
      const requests = [
        getExpenseSummary(),
        getExpenses(apiFilters),
      ];

      if (hasActiveFilters(activeFilters)) {
        requests.push(getExpenses());
      }

      const [summaryData, expensesData, allExpensesData] = await Promise.all(requests);

      if (summaryData.success) {
        setSummary(summaryData);
      } else {
        setError(summaryData.message || 'Failed to load expense summary.');
      }

      if (expensesData.success) {
        setExpenses(expensesData.data || []);
      } else {
        setError((prev) => prev || expensesData.message || 'Failed to load expenses.');
      }

      if (allExpensesData?.success) {
        setTotalTransactionCount(
          allExpensesData.count ?? allExpensesData.data?.length ?? 0,
        );
      } else if (expensesData.success && !hasActiveFilters(activeFilters)) {
        setTotalTransactionCount(
          expensesData.count ?? expensesData.data?.length ?? 0,
        );
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Unable to connect to the server. Please ensure the backend is running.';

      setError(message);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, [filters]);

  useEffect(() => {
    fetchDashboardData(filters);
  }, [filters, fetchDashboardData]);

  const handleFilterChange = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const handleDataChanged = useCallback(() => {
    fetchDashboardData(filters, true);
  }, [fetchDashboardData, filters]);

  const handleExportCsv = useCallback(() => {
    if (!expenses.length) {
      showToast('No expenses available to export.', 'error');
      return;
    }

    exportExpensesToCsv(expenses);
    showToast('Export successful. expenses.csv downloaded.', 'success');
  }, [expenses, showToast]);

  const chartBreakdown = useMemo(() => {
    if (hasActiveFilters(filters)) {
      return buildCategoryBreakdown(expenses);
    }

    return summary?.categoryBreakdown || buildCategoryBreakdown(expenses);
  }, [expenses, summary, filters]);

  const summaryBreakdown = useMemo(
    () => summary?.categoryBreakdown || buildCategoryBreakdown(expenses),
    [summary, expenses],
  );

  const timelineExpenses = useMemo(() => {
    if (hasActiveFilters(filters)) {
      return getRecentExpenses(expenses);
    }

    return summary?.recentExpenses?.length
      ? summary.recentExpenses
      : getRecentExpenses(expenses);
  }, [expenses, summary, filters]);

  const monthlyTrend = useMemo(
    () => buildMonthlyTrend(expenses),
    [expenses],
  );

  const insights = useMemo(() => {
    if (hasActiveFilters(filters)) {
      return buildFilteredInsights(expenses, chartBreakdown);
    }

    return buildGlobalInsights(summary, totalTransactionCount, summaryBreakdown);
  }, [filters, expenses, chartBreakdown, summary, totalTransactionCount, summaryBreakdown]);

  const expenseCount = expenses.length;

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

          <h1 className="dashboard-hero__title">PayTrack</h1>
          <p className="dashboard-hero__description">
             Smart expense analytics dashboard to track, manage and analyze your spending with real-time insights.
          </p>

          <div className="dashboard-hero__stats">
            <div className="dashboard-hero__stat">
              <span className="dashboard-hero__stat-value">
                {loading ? '—' : expenseCount}
              </span>
              <span className="dashboard-hero__stat-label">
                {hasActiveFilters(filters)
                  ? 'Filtered Expenses'
                  : 'Total Expenses Recorded'}
              </span>
            </div>
            <div className="dashboard-hero__stat-divider" aria-hidden="true" />
            <div className="dashboard-hero__stat">
              <span className="dashboard-hero__stat-value">
                {loading ? '—' : chartBreakdown.length}
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
          <button
            type="button"
            className="dashboard__alert-btn"
            onClick={() => fetchDashboardData(filters)}
          >
            Retry
          </button>
        </div>
      )}

      <SummaryCards
        summary={summary}
        loading={loading}
        breakdown={summaryBreakdown}
        transactionCount={totalTransactionCount}
      />

      <section className="dashboard-panel">
        <div className="dashboard-panel__header">
          <h2 className="dashboard-panel__title">Insights</h2>
          <p className="dashboard-panel__subtitle">Key spending metrics at a glance</p>
        </div>
        <InsightsPanel insights={insights} loading={loading} />
      </section>

      <div className="dashboard__main-grid">
        <section className="dashboard-panel dashboard-panel--form">
          <div className="dashboard-panel__header">
            <h2 className="dashboard-panel__title">Add Expense</h2>
            <p className="dashboard-panel__subtitle">Record a new transaction</p>
          </div>
          <ExpenseForm
            onExpenseCreated={handleDataChanged}
            onShowToast={showToast}
          />
        </section>

        <section className="dashboard-panel dashboard-panel--chart">
          <div className="dashboard-panel__header">
            <h2 className="dashboard-panel__title">Expense Distribution</h2>
            <p className="dashboard-panel__subtitle">Category-wise spending</p>
          </div>
          <ExpensePieChart data={chartBreakdown} loading={loading} />
        </section>
      </div>

      <section className="dashboard-panel dashboard-panel--toolbar">
        <div className="dashboard-panel__header">
          <h2 className="dashboard-panel__title">Filters</h2>
          <p className="dashboard-panel__subtitle">Refine your expense view</p>
        </div>
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel__header dashboard-panel__header--row">
          <div>
            <h2 className="dashboard-panel__title">All Expenses</h2>
            <p className="dashboard-panel__subtitle">Manage your transactions</p>
          </div>
          <button
            type="button"
            className="dashboard__export-btn"
            onClick={handleExportCsv}
            disabled={loading || !expenses.length}
          >
            Export CSV
          </button>
        </div>
        <ExpenseList
          expenses={expenses}
          loading={loading}
          onExpenseChanged={handleDataChanged}
          onRetry={() => fetchDashboardData(filters)}
          onShowToast={showToast}
        />
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel__header">
          <h2 className="dashboard-panel__title">Monthly Spending Trend</h2>
          <p className="dashboard-panel__subtitle">Track spending patterns over time</p>
        </div>
        <MonthlyTrendChart data={monthlyTrend} loading={loading} />
      </section>

      <div className="dashboard__analytics-grid">
        <section className="dashboard-panel">
          <div className="dashboard-panel__header">
            <h2 className="dashboard-panel__title">Category Distribution</h2>
            <p className="dashboard-panel__subtitle">Spending by category</p>
          </div>
          <ExpensePieChart data={chartBreakdown} loading={loading} />
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel__header">
            <h2 className="dashboard-panel__title">Category Comparison</h2>
            <p className="dashboard-panel__subtitle">Category totals at a glance</p>
          </div>
          <ExpenseBarChart data={chartBreakdown} loading={loading} />
        </section>
      </div>

      <section className="dashboard-panel">
        <div className="dashboard-panel__header">
          <h2 className="dashboard-panel__title">Recent Activity</h2>
          <p className="dashboard-panel__subtitle">Your latest transactions</p>
        </div>
        <RecentTimeline expenses={timelineExpenses} loading={loading} />
      </section>
    </div>
  );
}

export default Dashboard;
