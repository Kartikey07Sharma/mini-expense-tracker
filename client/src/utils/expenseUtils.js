export const INITIAL_FILTERS = {
  category: '',
  startDate: '',
  endDate: '',
};

export const hasActiveFilters = (filters) =>
  Boolean(filters.category || filters.startDate || filters.endDate);

export const buildApiFilters = (filters) => {
  const params = {};

  if (filters.category) params.category = filters.category;
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;

  return params;
};

export const buildCategoryBreakdown = (expenses) => {
  const totals = {};

  expenses.forEach((expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + Number(expense.amount);
  });

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
};

export const getRecentExpenses = (expenses, limit = 5) =>
  [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id)
    .slice(0, limit);
