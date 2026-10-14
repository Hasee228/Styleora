import { Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { discountPercent, formatINR, effectivePrice } from "../utils/format";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, onQuickView }) {
  const { has, toggle } = useWishlist();
  const { notify } = useToast();
  const wished = has(product.id);
  const off = discountPercent(product.price, product.discountPrice);

  const onWish = (e) => {
    e.preventDefault();
    toggle(product.id);
    notify(wished ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.id}`}>
          <ProductImage src={product.images[0]} alt={product.name} />
        </Link>
        {off > 0 && <span className="badge badge--sale">{off}% off</span>}
        {product.isNew && off === 0 && <span className="badge">New</span>}
        <button
          className="wish-btn"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={onWish}
        >
          <Heart size={16} fill={wished ? "#171717" : "none"} />
        </button>
        <div className="product-card__actions">
          <button className="btn btn--ghost btn--full" type="button" onClick={() => onQuickView(product)}>
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>
      <Link to={`/product/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>
      <div className="meta">
        <div className="price">
          <strong>{formatINR(effectivePrice(product))}</strong>
          {off > 0 && <s>{formatINR(product.price)}</s>}
        </div>
        <span className="rating-inline">★ {product.rating}</span>
      </div>
    </article>
  );
}
