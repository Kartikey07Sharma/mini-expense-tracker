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

export const getTopCategory = (breakdown) => {
  if (!breakdown?.length) {
    return { category: '—', total: 0 };
  }

  return breakdown[0];
};

export const buildMonthlyTrend = (expenses) => {
  const monthTotals = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    monthTotals[key] = (monthTotals[key] || 0) + Number(expense.amount);
  });

  return Object.entries(monthTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, total]) => {
      const [year, month] = key.split('-');
      const label = new Intl.DateTimeFormat('en-IN', {
        month: 'short',
        year: 'numeric',
      }).format(new Date(Number(year), Number(month) - 1, 1));

      return {
        month: label,
        total,
        sortKey: key,
      };
    });
};

export const buildGlobalInsights = (summary, totalTransactionCount, breakdown) => {
  const topCategory = getTopCategory(breakdown);

  return {
    topCategory: topCategory.category,
    topCategoryAmount: topCategory.total,
    totalTransactions: totalTransactionCount,
    highestExpense: Number(summary?.highestExpense ?? 0),
    averageExpense: Number(summary?.averageExpense ?? 0),
    totalSpending: Number(summary?.totalExpenses ?? 0),
    mostRecentDate: summary?.recentExpenses?.[0]?.date || null,
  };
};

export const buildFilteredInsights = (expenses, breakdown) => {
  const topCategory = getTopCategory(breakdown);
  const recentExpenses = getRecentExpenses(expenses, 1);
  const amounts = expenses.map((expense) => Number(expense.amount));
  const totalSpending = breakdown.reduce(
    (sum, item) => sum + Number(item.total),
    0,
  );

  return {
    topCategory: topCategory.category,
    topCategoryAmount: topCategory.total,
    totalTransactions: expenses.length,
    highestExpense: amounts.length ? Math.max(...amounts) : 0,
    averageExpense: amounts.length
      ? amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length
      : 0,
    totalSpending,
    mostRecentDate: recentExpenses[0]?.date || null,
  };
};
