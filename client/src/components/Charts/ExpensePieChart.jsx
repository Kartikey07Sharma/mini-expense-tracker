import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';
import { getCategoryColor } from './chartConstants';
import './Charts.css';

const renderTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const { category, total } = payload[0].payload;

  return (
    <div className="charts-tooltip">
      <p className="charts-tooltip__label">{category}</p>
      <p className="charts-tooltip__value">{formatCurrency(total)}</p>
    </div>
  );
};

function ExpensePieChart({ data, loading }) {
  if (loading) {
    return (
      <div className="charts charts--loading" aria-label="Loading pie chart">
        <div className="charts__skeleton charts__skeleton--pie" />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="charts charts--empty">
        <div className="charts__empty-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 12a9 9 0 1 1-9-9" />
            <path d="M21 3v9h-9" />
          </svg>
        </div>
        <p className="charts__empty-title">No analytics data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + Number(item.total), 0);

  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={3}
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={getCategoryColor(index)} />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span className="charts-legend__label">{value}</span>
            )}
          />
          <text
            x="50%"
            y="46%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="charts-center-label"
          >
            Total
          </text>
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="charts-center-value"
          >
            {formatCurrency(total)}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;
