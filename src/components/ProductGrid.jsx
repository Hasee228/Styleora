import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onQuickView }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h2>No pieces found</h2>
        <p>Try another search, colour, or price range.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
