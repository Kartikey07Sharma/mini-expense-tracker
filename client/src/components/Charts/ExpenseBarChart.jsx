import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';
import './Charts.css';

const renderTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="charts-tooltip">
      <p className="charts-tooltip__label">{label}</p>
      <p className="charts-tooltip__value">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

const formatYAxis = (value) => {
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}k`;
  }

  return `₹${value}`;
};

function ExpenseBarChart({ data, loading }) {
  if (loading) {
    return (
      <div className="charts charts--loading" aria-label="Loading bar chart">
        <div className="charts__skeleton charts__skeleton--bar" />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="charts charts--empty">
        <div className="charts__empty-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <p className="charts__empty-title">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.6)" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            axisLine={{ stroke: '#334155' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatYAxis}
          />
          <Tooltip content={renderTooltip} cursor={{ fill: 'rgba(139, 92, 246, 0.08)' }} />
          <Bar
            dataKey="total"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseBarChart;
