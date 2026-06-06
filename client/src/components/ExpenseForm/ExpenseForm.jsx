import { useState } from 'react';
import { createExpense } from '../../api/expenseApi';
import './ExpenseForm.css';

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

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const INITIAL_FORM = {
  amount: '',
  category: '',
  date: getTodayDate(),
  note: '',
};

function ExpenseForm({ onExpenseCreated }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (successMessage) setSuccessMessage('');
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

  const resetForm = () => {
    setForm({ ...INITIAL_FORM, date: getTodayDate() });
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage('');
    setSubmitError('');

    if (!validate()) return;

    setSubmitting(true);

    try {
      const payload = {
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        note: form.note.trim() || null,
      };

      const data = await createExpense(payload);

      if (data.success) {
        setSuccessMessage(data.message || 'Expense created successfully.');
        resetForm();
        onExpenseCreated?.();
      } else {
        setSubmitError(data.message || 'Failed to create expense.');
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
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      {successMessage && (
        <div className="expense-form__banner expense-form__banner--success" role="status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}

      {submitError && (
        <div className="expense-form__banner expense-form__banner--error" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      <div className="expense-form__grid">
        <div
          className={`expense-form__field ${
            errors.amount ? 'expense-form__field--error' : ''
          }`}
        >
          <label className="expense-form__label" htmlFor="amount">
            Amount <span className="expense-form__required">*</span>
          </label>
          <div className="expense-form__input-wrap">
            <span className="expense-form__prefix" aria-hidden="true">₹</span>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              required
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              disabled={submitting}
              className="expense-form__input expense-form__input--amount"
            />
          </div>
          {errors.amount && (
            <p className="expense-form__error" role="alert">{errors.amount}</p>
          )}
        </div>

        <div
          className={`expense-form__field ${
            errors.category ? 'expense-form__field--error' : ''
          }`}
        >
          <label className="expense-form__label" htmlFor="category">
            Category <span className="expense-form__required">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            disabled={submitting}
            className="expense-form__input expense-form__select"
          >
            <option value="">Select category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="expense-form__error" role="alert">{errors.category}</p>
          )}
        </div>

        <div
          className={`expense-form__field ${
            errors.date ? 'expense-form__field--error' : ''
          }`}
        >
          <label className="expense-form__label" htmlFor="date">
            Date <span className="expense-form__required">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            max={getTodayDate()}
            value={form.date}
            onChange={handleChange}
            disabled={submitting}
            className="expense-form__input"
          />
          {errors.date && (
            <p className="expense-form__error" role="alert">{errors.date}</p>
          )}
        </div>

        <div className="expense-form__field expense-form__field--full">
          <label className="expense-form__label" htmlFor="note">
            Note
            <span className="expense-form__optional">(optional)</span>
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            placeholder="Add a short description..."
            value={form.note}
            onChange={handleChange}
            disabled={submitting}
            className="expense-form__input expense-form__textarea"
          />
        </div>
      </div>

      <button
        type="submit"
        className="expense-form__submit"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <span className="expense-form__spinner" aria-hidden="true" />
            Saving...
          </>
        ) : (
          'Add Expense'
        )}
      </button>
    </form>
  );
}

export default ExpenseForm;
