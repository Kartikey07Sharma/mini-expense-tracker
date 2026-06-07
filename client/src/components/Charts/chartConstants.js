export const CHART_COLORS = [
  '#8B5CF6',
  '#6366F1',
  '#A78BFA',
  '#818CF8',
  '#C4B5FD',
  '#7C3AED',
  '#4F46E5',
  '#DDD6FE',
];

export const getCategoryColor = (index) =>
  CHART_COLORS[index % CHART_COLORS.length];
