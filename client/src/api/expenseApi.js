import axios from 'axios';

const API_BASE_URL = 'https://paytrack-api-8313.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getExpenses = async (filters = {}) => {
  const params = {};

  if (filters.category) params.category = filters.category;
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;

  const response = await api.get('/expenses', { params });
  return response.data;
};

export const createExpense = async (expense) => {
  const response = await api.post('/expenses', expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await api.put(`/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

export const getExpenseSummary = async () => {
  const response = await api.get('/expenses/summary');
  return response.data;
};

export default api;
