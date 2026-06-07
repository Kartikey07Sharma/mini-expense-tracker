import { formatCurrency } from '../../utils/formatCurrency';
import './RecentTimeline.css';

const CATEGORY_ICONS = {
  Food: '🛒',
  Transport: '🚕',
  Shopping: '🛍️',
  Entertainment: '🎬',
  Bills: '📄',
  Health: '💊',
  Education: '📚',
  Other: '📌',
};

const formatDate = (dateString) => {
  if (!dateString) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));
};

function RecentTimeline({ expenses, loading }) {
  if (loading) {
    return (
      <div className="timeline timeline--loading" aria-label="Loading recent activity">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="timeline__item timeline__item--skeleton">
            <div className="timeline__skeleton timeline__skeleton--icon" />
            <div className="timeline__content">
              <div className="timeline__skeleton timeline__skeleton--title" />
              <div className="timeline__skeleton timeline__skeleton--meta" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!expenses?.length) {
    return (
      <div className="timeline timeline--empty">
        <div className="timeline__empty-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <p className="timeline__empty-title">No recent activity</p>
        <p className="timeline__empty-text">Expenses matching your filters will appear here.</p>
      </div>
    );
  }

  return (
    <div className="timeline">
      {expenses.map((expense, index) => (
        <article key={expense.id} className="timeline__item">
          <div className="timeline__track">
            <span className="timeline__icon" aria-hidden="true">
              {CATEGORY_ICONS[expense.category] || '📌'}
            </span>
            {index < expenses.length - 1 && (
              <span className="timeline__connector" aria-hidden="true" />
            )}
          </div>

          <div className="timeline__content">
            <div className="timeline__header">
              <h3 className="timeline__title">
                {expense.category} Expense
              </h3>
              <span className="timeline__amount">{formatCurrency(expense.amount)}</span>
            </div>
            <p className="timeline__date">{formatDate(expense.date)}</p>
            {expense.note && <p className="timeline__note">{expense.note}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

export default RecentTimeline;
