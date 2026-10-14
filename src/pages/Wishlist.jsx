import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import ProductImage from "../components/ProductImage";
import { formatINR, effectivePrice } from "../utils/format";

export default function Wishlist() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();
  const { notify } = useToast();

  const moveToCart = (product) => {
    if (!product.inStock) {
      notify("This piece is out of stock.", "error");
      return;
    }
    addItem(product, {
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    });
    notify("Added to cart with default size and colour");
  };

  if (!items.length) {
    return (
      <div className="empty-state">
        <Heart size={48} />
        <h2>Your wishlist is quiet</h2>
        <p>Save the pieces that feel like you. They’ll wait here.</p>
        <Link to="/shop" className="btn">
          Discover the Edit
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Saved</span>
          <h1>Wishlist</h1>
        </div>
      </div>
      <div className="container" style={{ padding: "48px 0 80px" }}>
        <div className="product-grid">
          {items.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-card__media">
                <Link to={`/product/${product.id}`}>
                  <ProductImage src={product.images[0]} alt={product.name} />
                </Link>
              </div>
              <h3>{product.name}</h3>
              <div className="price">
                <strong>{formatINR(effectivePrice(product))}</strong>
              </div>
              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                <button className="btn" type="button" onClick={() => moveToCart(product)}>
                  Add to Cart
                </button>
                <button
                  className="btn btn--ghost"
                  type="button"
                  onClick={() => {
                    remove(product.id);
                    notify("Removed from wishlist");
                  }}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
