import { useState } from 'react';
import { updateExpense, deleteExpense } from '../../api/expenseApi';
import { formatCurrency } from '../../utils/formatCurrency';
import EmptyState from '../EmptyState/EmptyState';
import './ExpenseList.css';

const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Bills',
  'Health',
  'Education',
  'Other',
];

const SKELETON_ROWS = 5;

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatDate = (dateString) => {
  if (!dateString) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
};

function EditModal({ expense, onClose, onSaved }) {
  const [form, setForm] = useState({
    amount: String(expense.amount),
    category: expense.category,
    date: expense.date,
    note: expense.note || '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (submitError) setSubmitError('');
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.amount.trim()) {
      nextErrors.amount = 'Amount is required.';
    } else if (Number(form.amount) <= 0) {
      nextErrors.amount = 'Amount must be greater than zero.';
    }

    if (!form.category) {
      nextErrors.category = 'Please select a category.';
    }

    if (!form.date) {
      nextErrors.date = 'Date is required.';
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        nextErrors.date = 'Future dates are not allowed.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        note: form.note.trim() || null,
      };

      const data = await updateExpense(expense.id, payload);

      if (data.success) {
        onSaved();
      } else {
        setSubmitError(data.message || 'Failed to update expense.');
      }
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="expense-list-modal" role="dialog" aria-modal="true" aria-labelledby="edit-modal-title">
      <div className="expense-list-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="expense-list-modal__content">
        <div className="expense-list-modal__header">
          <h3 id="edit-modal-title" className="expense-list-modal__title">Edit Expense</h3>
          <button type="button" className="expense-list-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="expense-list-modal__form" onSubmit={handleSubmit} noValidate>
          {submitError && (
            <div className="expense-list__banner expense-list__banner--error" role="alert">
              {submitError}
            </div>
          )}

          <div className="expense-list-modal__grid">
            <div
              className={`expense-list-modal__field ${
                errors.amount ? 'expense-list-modal__field--error' : ''
              }`}
            >
              <label htmlFor="edit-amount">Amount *</label>
              <input
                id="edit-amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                required
                value={form.amount}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.amount && <span className="expense-list-modal__error">{errors.amount}</span>}
            </div>

            <div
              className={`expense-list-modal__field ${
                errors.category ? 'expense-list-modal__field--error' : ''
              }`}
            >
              <label htmlFor="edit-category">Category *</label>
              <select
                id="edit-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                disabled={submitting}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <span className="expense-list-modal__error">{errors.category}</span>}
            </div>

            <div
              className={`expense-list-modal__field ${
                errors.date ? 'expense-list-modal__field--error' : ''
              }`}
            >
              <label htmlFor="edit-date">Date *</label>
              <input
                id="edit-date"
                name="date"
                type="date"
                max={getTodayDate()}
                value={form.date}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.date && <span className="expense-list-modal__error">{errors.date}</span>}
            </div>

            <div className="expense-list-modal__field expense-list-modal__field--full">
              <label htmlFor="edit-note">Note</label>
              <textarea
                id="edit-note"
                name="note"
                rows={3}
                value={form.note}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Add a short description..."
              />
            </div>
          </div>

          <div className="expense-list-modal__actions">
            <button type="button" className="expense-list__btn expense-list__btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="expense-list__btn expense-list__btn--primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteModal({ expense, onClose, onConfirm, deleting }) {
  return (
    <div className="expense-list-modal" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
      <div
        className="expense-list-modal__backdrop"
        onClick={() => !deleting && onClose()}
        aria-hidden="true"
      />
      <div className="expense-list-modal__content expense-list-modal__content--sm">
        <div className="expense-list-modal__header">
          <h3 id="delete-modal-title" className="expense-list-modal__title">Delete Expense</h3>
          <button
            type="button"
            className="expense-list-modal__close"
            onClick={() => !deleting && onClose()}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <p className="expense-list-modal__message">
          Are you sure you want to delete this expense?
        </p>

        <div className="expense-list-modal__delete-preview">
          <span className="expense-list-modal__delete-amount">
            {formatCurrency(expense.amount)}
          </span>
          <span className="expense-list-modal__delete-meta">
            {expense.category} · {formatDate(expense.date)}
          </span>
        </div>

        <div className="expense-list-modal__actions">
          <button
            type="button"
            className="expense-list__btn expense-list__btn--ghost"
            onClick={onClose}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="expense-list__btn expense-list__btn--danger"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ExpenseList({
  expenses = [],
  loading = false,
  error = '',
  onExpenseChanged,
  onRetry,
  onShowToast,
}) {
  const [actionError, setActionError] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleUpdateSuccess = () => {
    setEditingExpense(null);
    onShowToast?.('Expense updated successfully.', 'success');
    onExpenseChanged?.();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingExpense) return;

    setDeleting(true);
    setActionError('');

    try {
      const data = await deleteExpense(deletingExpense.id);

      if (data.success) {
        setDeletingExpense(null);
        onShowToast?.('Expense deleted successfully.', 'success');
        onExpenseChanged?.();
      } else {
        setActionError(data.message || 'Failed to delete expense.');
        onShowToast?.(data.message || 'Failed to delete expense.', 'error');
        setDeletingExpense(null);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Something went wrong. Please try again.';

      setActionError(message);
      onShowToast?.(message, 'error');
      setDeletingExpense(null);
    } finally {
      setDeleting(false);
    }
  };

  const displayError = actionError || error;

  if (loading) {
    return (
      <div className="expense-list">
        <div className="expense-list__table-wrap expense-list__table-wrap--loading">
          <table className="expense-list__table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                <tr key={index} className="expense-list__row expense-list__row--skeleton">
                  <td><div className="expense-list__skeleton expense-list__skeleton--sm" /></td>
                  <td><div className="expense-list__skeleton" /></td>
                  <td><div className="expense-list__skeleton expense-list__skeleton--md" /></td>
                  <td><div className="expense-list__skeleton expense-list__skeleton--lg" /></td>
                  <td><div className="expense-list__skeleton expense-list__skeleton--actions" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {displayError && (
        <div className="expense-list__banner expense-list__banner--error" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{displayError}</span>
          {onRetry && !actionError && (
            <button type="button" className="expense-list__banner-btn" onClick={onRetry}>
              Retry
            </button>
          )}
        </div>
      )}

      {!displayError && expenses.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No expenses found"
          description="Create your first expense to start tracking your spending."
        />
      ) : (
        !displayError && (
          <div className="expense-list__table-wrap">
            <table className="expense-list__table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="expense-list__row">
                    <td data-label="Amount">
                      <span className="expense-list__amount">
                        {formatCurrency(expense.amount)}
                      </span>
                    </td>
                    <td data-label="Category">
                      <span className="expense-list__category">{expense.category}</span>
                    </td>
                    <td data-label="Date">{formatDate(expense.date)}</td>
                    <td data-label="Note">
                      <span className="expense-list__note">
                        {expense.note || '—'}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="expense-list__actions">
                        <button
                          type="button"
                          className="expense-list__btn expense-list__btn--edit"
                          onClick={() => setEditingExpense(expense)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="expense-list__btn expense-list__btn--delete"
                          onClick={() => setDeletingExpense(expense)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {editingExpense && (
        <EditModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSaved={handleUpdateSuccess}
        />
      )}

      {deletingExpense && (
        <DeleteModal
          expense={deletingExpense}
          onClose={() => !deleting && setDeletingExpense(null)}
          onConfirm={handleDeleteConfirm}
          deleting={deleting}
        />
      )}
    </div>
  );
}

export default ExpenseList;
