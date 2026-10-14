import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductImage from "../components/ProductImage";
import ProductGrid from "../components/ProductGrid";
import QuickViewModal from "../components/QuickViewModal";
import { getProductById, getRelated, categoryLabel } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { discountPercent, effectivePrice, formatINR } from "../utils/format";
import NotFound from "./NotFound";

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { notify } = useToast();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [error, setError] = useState("");
  const [quick, setQuick] = useState(null);

  const related = useMemo(() => (product ? getRelated(product) : []), [product]);

  if (!product) return <NotFound />;

  const wished = has(product.id);
  const off = discountPercent(product.price, product.discountPrice);

  const validate = () => {
    if (!size || !color) {
      setError("Please select a size and colour before continuing.");
      return false;
    }
    if (!product.inStock) {
      setError("This piece is currently out of stock.");
      return false;
    }
    setError("");
    return true;
  };

  const add = (buyNow = false) => {
    if (!validate()) return;
    addItem(product, { size, color, quantity: qty });
    notify("Added to cart");
    if (buyNow) navigate("/checkout");
  };

  return (
    <div className="container">
      <div className="pdp">
        <div className="gallery">
          <div className="thumbs">
            {product.images.map((src, i) => (
              <button
                key={i}
                type="button"
                className={active === i ? "active" : ""}
                onClick={() => setActive(i)}
              >
                <ProductImage src={src} alt="" />
              </button>
            ))}
          </div>
          <div className="gallery__main">
            <ProductImage src={product.images[active]} alt={product.name} loading="eager" />
          </div>
        </div>

        <div className="pdp__details">
          <div className="breadcrumbs" style={{ justifyContent: "flex-start" }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`}>{categoryLabel(product.category)}</Link>
          </div>
          <h1>{product.name}</h1>
          <div className="rating-inline">
            ★ {product.rating} · {product.reviewCount} reviews
          </div>
          <div className="price" style={{ marginTop: 14, fontSize: 20 }}>
            <strong>{formatINR(effectivePrice(product))}</strong>
            {off > 0 && <s>{formatINR(product.price)}</s>}
            {off > 0 && <span className="badge badge--sale" style={{ position: "static" }}>{off}% off</span>}
          </div>
          <p className={`stock ${product.inStock ? "" : "out"}`}>
            {product.inStock ? `In stock · ${product.stockCount} remaining` : "Out of stock"}
          </p>
          <p style={{ color: "var(--gray)", marginBottom: 22 }}>{product.description}</p>

          <div>
            Size
            <div className="sizes">
              {product.sizes.map((s) => (
                <button key={s} type="button" className={`chip ${size === s ? "active" : ""}`} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            Colour
            <div className="swatches">
              {product.colors.map((c) => (
                <button key={c} type="button" className={`chip ${color === c ? "active" : ""}`} onClick={() => setColor(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            Quantity
            <div className="qty" style={{ marginTop: 8 }}>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                −
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                +
              </button>
            </div>
          </div>

          {error && <p className="field-error" style={{ marginTop: 12 }}>{error}</p>}

          <div className="pdp-actions">
            <button className="btn" type="button" onClick={() => add(false)} disabled={!product.inStock}>
              Add to Cart
            </button>
            <button className="btn btn--ghost" type="button" onClick={() => add(true)} disabled={!product.inStock}>
              Buy Now
            </button>
          </div>
          <button
            className="btn btn--ghost btn--full"
            type="button"
            onClick={() => {
              toggle(product.id);
              notify(wished ? "Removed from wishlist" : "Added to wishlist");
            }}
          >
            <Heart size={14} fill={wished ? "#171717" : "none"} />
            {wished ? "Saved" : "Save to Wishlist"}
          </button>

          <div className="care-box">
            <p>
              <strong style={{ color: "var(--black)" }}>Fabric. </strong>
              {product.fabric}
            </p>
            <p style={{ marginTop: 8 }}>
              <strong style={{ color: "var(--black)" }}>Care. </strong>
              {product.care}
            </p>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <span className="eyebrow">Complete the look</span>
          <h2>Related Products</h2>
        </div>
        <ProductGrid products={related} onQuickView={setQuick} />
      </div>
      {quick && <QuickViewModal product={quick} onClose={() => setQuick(null)} />}
    </div>
  );
}
