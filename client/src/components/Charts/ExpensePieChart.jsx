import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";
import EmptyState from "../EmptyState/EmptyState";
import { getCategoryColor } from "./chartConstants";
import "./Charts.css";

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
        <div className="charts__skeleton charts__skeleton--legend" />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <EmptyState
        icon="📊"
        title="No expenses found"
        description="Create your first expense to start tracking your spending."
      />
    );
  }

  // Convert MySQL DECIMAL strings into numbers
  const chartData = data.map((item) => ({
    ...item,
    total: Number(item.total),
  }));

  console.log("Pie Chart Data:", chartData);

  const total = chartData.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={3}
            animationBegin={0}
            animationDuration={800}
            isAnimationActive={true}
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.category}
                fill={getCategoryColor(entry.category)}
              />
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