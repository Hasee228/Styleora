import { CATEGORIES } from "../data/products";

export default function FilterSidebar({
  open,
  allProducts,
  filters,
  setFilters,
  sizes,
  colors,
  onClear,
}) {
  const activeFilterCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    Number(filters.minPrice !== "") +
    Number(filters.maxPrice !== "");

  const toggleArr = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  return (
    <aside className={`filter-sidebar ${open ? "open" : ""}`}>
      <div className="filter-sidebar__header">
        <div>
          <span className="eyebrow">Refine your edit</span>
          <h3>Filters</h3>
        </div>
        {activeFilterCount > 0 && (
          <span className="filter-count">{activeFilterCount} applied</span>
        )}
      </div>
      <fieldset className="filter-group filter-group--categories">
        <legend>Category</legend>
        {CATEGORIES.map((c) => (
          <label key={c.id} className="check-row">
            <input
              type="checkbox"
              checked={filters.categories.includes(c.id)}
              onChange={() => toggleArr("categories", c.id)}
            />
            <span>{c.name}</span>
          </label>
        ))}
      </fieldset>

      <div className="filter-group filter-group--price">
        <div className="label">Price range</div>
        <div className="price-inputs">
          <label className="sr-only" htmlFor="min-price">
            Minimum price
          </label>
          <div className="price-input">
            <span aria-hidden="true">₹</span>
            <input
              id="min-price"
              type="number"
              min="0"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))}
            />
          </div>
          <label className="sr-only" htmlFor="max-price">
            Maximum price
          </label>
          <div className="price-input">
            <span aria-hidden="true">₹</span>
            <input
              id="max-price"
              type="number"
              min="0"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <fieldset className="filter-group filter-group--options">
        <legend>Size</legend>
        <div className="filter-options filter-options--sizes">
          {sizes.map((s) => (
            <label key={s} className="filter-chip">
              <input
                type="checkbox"
                checked={filters.sizes.includes(s)}
                onChange={() => toggleArr("sizes", s)}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group filter-group--options filter-group--colours">
        <legend>Colour</legend>
        <div className="filter-options filter-options--colours">
          {colors.map((c) => (
            <label key={c} className="filter-chip filter-chip--colour">
              <input
                type="checkbox"
                checked={filters.colors.includes(c)}
                onChange={() => toggleArr("colors", c)}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="filter-sidebar__footer">
        <p>{allProducts.length} pieces in this edit</p>
        <button className="filter-clear" type="button" onClick={onClear} disabled={!activeFilterCount}>
          Clear all
        </button>
      </div>
    </aside>
  );
}
