import { formatCurrency } from '../../utils/formatCurrency';
import './InsightsPanel.css';

const formatDisplayDate = (dateString) => {
  if (!dateString) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
};

const INSIGHT_CONFIG = [
  { key: 'topCategory', label: 'Top Spending Category', type: 'category' },
  { key: 'totalTransactions', label: 'Total Transactions', type: 'count' },
  { key: 'highestExpense', label: 'Highest Expense', type: 'currency' },
  { key: 'averageExpense', label: 'Average Expense', type: 'currency' },
  { key: 'totalSpending', label: 'Total Spending', type: 'currency' },
  { key: 'mostRecentDate', label: 'Most Recent Expense', type: 'date' },
];

function InsightsPanel({ insights, loading }) {
  if (loading) {
    return (
      <section className="insights-panel" aria-label="Spending insights">
        <div className="insights-panel__grid">
          {INSIGHT_CONFIG.map(({ key }) => (
            <div key={key} className="insights-card insights-card--skeleton">
              <div className="insights-card__skeleton insights-card__skeleton--label" />
              <div className="insights-card__skeleton insights-card__skeleton--value" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const formatValue = (key, type) => {
    const value = insights?.[key];

    if (type === 'category') {
      return (
        <>
          <span className="insights-card__primary">{insights.topCategory}</span>
          <span className="insights-card__secondary">
            {formatCurrency(insights.topCategoryAmount)}
          </span>
        </>
      );
    }

    if (type === 'count') return value ?? 0;
    if (type === 'currency') return formatCurrency(value ?? 0);
    if (type === 'date') return formatDisplayDate(value);

    return value ?? '—';
  };

  return (
    <section className="insights-panel" aria-label="Spending insights">
      <div className="insights-panel__grid">
        {INSIGHT_CONFIG.map(({ key, label, type }) => (
          <article key={key} className="insights-card">
            <p className="insights-card__label">{label}</p>
            <div className={`insights-card__value${type === 'category' ? ' insights-card__value--stacked' : ''}`}>
              {formatValue(key, type)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default InsightsPanel;
