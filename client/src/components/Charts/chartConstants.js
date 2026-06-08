export const CATEGORY_COLORS = {
  Food: '#ef3232',          // Red
  Transport: '#3B82F6',     // Blue
  Shopping: '#F59E0B',      // Orange
  Entertainment: '#A855F7', // Purple
  Bills: '#4d2004',         // Brown
  Health: '#22C55E',        // Green
  Education: '#EC4899',     // Pink
  Other: '#64748B',         // Slate Gray
};
export const getCategoryColor = (category) =>
  CATEGORY_COLORS[category] || '#8B5CF6';