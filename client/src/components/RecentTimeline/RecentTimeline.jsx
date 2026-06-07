import { formatCurrency } from '../../utils/formatCurrency';
import EmptyState from '../EmptyState/EmptyState';
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
              <div className="timeline__skeleton timeline__skeleton--note" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!expenses?.length) {
    return (
      <EmptyState
        icon="🕒"
        title="No expenses found"
        description="Create your first expense to start tracking your spending."
      />
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
