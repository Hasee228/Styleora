import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import QuickViewModal from "../components/QuickViewModal";
import { products } from "../data/products";
import { applyFilters, uniqueColors, uniqueSizes } from "../utils/filters";

const emptyFilters = {
  categories: [],
  sizes: [],
  colors: [],
  minPrice: "",
  maxPrice: "",
  sort: "newest",
  query: "",
};

export default function Shop({
  title = "The Edit",
  eyebrow = "Shop",
  seed = products,
  lockedCategories,
}) {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [quick, setQuick] = useState(null);
  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    query: params.get("q") || "",
    sort: params.get("sort") || "newest",
    categories: lockedCategories || [],
  }));

  const sizes = useMemo(() => uniqueSizes(seed), [seed]);
  const colors = useMemo(() => uniqueColors(seed), [seed]);

  const list = useMemo(
    () =>
      applyFilters(seed, {
        ...filters,
        categories: lockedCategories?.length ? lockedCategories : filters.categories,
        minPrice: filters.minPrice === "" ? null : filters.minPrice,
        maxPrice: filters.maxPrice === "" ? null : filters.maxPrice,
      }),
    [seed, filters, lockedCategories]
  );

  const onClear = () => {
    setFilters({
      ...emptyFilters,
      categories: lockedCategories || [],
    });
    setParams({});
  };

  const onQuery = (value) => {
    setFilters((p) => ({ ...p, query: value }));
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    setParams(next);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <div className="breadcrumbs">
            <span>Home</span>
            <span>/</span>
            <span>{title}</span>
          </div>
        </div>
      </div>
      <div className="container shop-layout">
        <FilterSidebar
          open={open}
          allProducts={seed}
          filters={filters}
          setFilters={setFilters}
          sizes={sizes}
          colors={colors}
          onClear={onClear}
        />
        <div>
          <div className="shop-toolbar">
            <button className="btn btn--ghost filter-toggle" type="button" onClick={() => setOpen((v) => !v)}>
              <SlidersHorizontal size={14} /> Filters
            </button>
            <label>
              <span className="sr-only">Search by name</span>
              <input
                type="search"
                placeholder="Search by name"
                value={filters.query}
                onChange={(e) => onQuery(e.target.value)}
              />
            </label>
            <label>
              <span className="sr-only">Sort products</span>
              <select
                value={filters.sort}
                onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value }))}
              >
                <option value="newest">Newest</option>
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
            <span style={{ color: "var(--gray)", fontSize: 13 }}>{list.length} pieces</span>
          </div>
          <ProductGrid products={list} onQuickView={setQuick} />
        </div>
      </div>
      {quick && <QuickViewModal product={quick} onClose={() => setQuick(null)} />}
    </>
  );
}
