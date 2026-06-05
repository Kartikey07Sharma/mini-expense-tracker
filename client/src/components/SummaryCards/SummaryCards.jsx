import { formatCurrency } from '../../utils/formatCurrency';
import './SummaryCards.css';

const CARD_CONFIG = [
  {
    key: 'total',
    label: 'Total Expenses',
    helper: 'All recorded spending',
    accent: 'purple',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    key: 'highest',
    label: 'Highest Expense',
    helper: 'Single largest transaction',
    accent: 'indigo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    key: 'average',
    label: 'Average Expense',
    helper: 'Per transaction average',
    accent: 'violet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

function SummaryCards({ summary, loading }) {
  if (loading) {
    return (
      <section className="summary-cards" aria-label="Key performance indicators">
        {[1, 2, 3].map((item) => (
          <div key={item} className="summary-card summary-card--skeleton">
            <div className="skeleton skeleton--icon" />
            <div className="skeleton skeleton--label" />
            <div className="skeleton skeleton--value" />
            <div className="skeleton skeleton--helper" />
          </div>
        ))}
      </section>
    );
  }

  const values = {
    total: formatCurrency(summary?.totalExpenses ?? 0),
    highest: formatCurrency(summary?.highestExpense ?? 0),
    average: formatCurrency(summary?.averageExpense ?? 0),
  };

  return (
    <section className="summary-cards" aria-label="Key performance indicators">
      {CARD_CONFIG.map(({ key, label, helper, accent, icon }) => (
        <article
          key={key}
          className={`summary-card summary-card--${accent}`}
        >
          <div className="summary-card__top">
            <div className="summary-card__icon-wrap">{icon}</div>
            <span className="summary-card__trend" aria-hidden="true">
              KPI
            </span>
          </div>

          <p className="summary-card__label">{label}</p>
          <p className="summary-card__value">{values[key]}</p>
          <p className="summary-card__helper">{helper}</p>
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;
