import './Filters.css';

const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Entertainment',
  'Bills',
  'Health',
  'Education',
  'Other',
];

function Filters({ filters, onFilterChange, onClearFilters }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filters">
      <div className="filters__grid">
        <div className="filters__field">
          <label className="filters__label" htmlFor="filter-category">
            Category
          </label>
          <select
            id="filter-category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="filters__input filters__select"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filters__field">
          <label className="filters__label" htmlFor="filter-start-date">
            Start Date
          </label>
          <input
            id="filter-start-date"
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleChange}
            className="filters__input"
          />
        </div>

        <div className="filters__field">
          <label className="filters__label" htmlFor="filter-end-date">
            End Date
          </label>
          <input
            id="filter-end-date"
            name="endDate"
            type="date"
            value={filters.endDate}
            onChange={handleChange}
            min={filters.startDate || undefined}
            className="filters__input"
          />
        </div>

        <div className="filters__actions">
          <button
            type="button"
            className="filters__clear-btn"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
