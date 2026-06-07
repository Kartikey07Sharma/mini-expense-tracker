const escapeCsvValue = (value) => {
  const stringValue = value == null ? '' : String(value);

  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  return `${String(date.getDate()).padStart(2, '0')}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${date.getFullYear()}`;
};

export const exportExpensesToCsv = (
  expenses,
  filename = `paytrack-expenses-${new Date()
    .toISOString()
    .split('T')[0]}.csv`
) => {
  const headers = ['Amount', 'Category', 'Date', 'Note'];

  const rows = expenses.map((expense) => [
    expense.amount,
    expense.category,
    formatDate(expense.date),
    expense.note || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map(escapeCsvValue).join(',')),
  ].join('\r\n');

  const blob = new Blob(['\uFEFF', csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};