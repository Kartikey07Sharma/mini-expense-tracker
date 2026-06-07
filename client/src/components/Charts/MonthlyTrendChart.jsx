import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';
import EmptyState from '../EmptyState/EmptyState';
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

function MonthlyTrendChart({ data, loading }) {
  if (loading) {
    return (
      <div className="charts charts--loading" aria-label="Loading monthly trend chart">
        <div className="charts__skeleton charts__skeleton--line" />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <EmptyState
        icon="📈"
        title="No expenses found"
        description="Create your first expense to start tracking your spending."
      />
    );
  }

  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.6)" vertical={false} />
          <XAxis
            dataKey="month"
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
          <Tooltip content={renderTooltip} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8B5CF6"
            strokeWidth={3}
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#6366F1' }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyTrendChart;
