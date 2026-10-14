import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatINR, effectivePrice, discountPercent } from "../utils/format";
import ProductImage from "./ProductImage";

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart();
  const { notify } = useToast();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  if (!product) return null;

  const add = () => {
    if (!size || !color) {
      setError("Please select a size and colour.");
      return;
    }
    if (!product.inStock) {
      setError("This piece is currently unavailable.");
      return;
    }
    addItem(product, { size, color, quantity: 1 });
    notify("Added to cart");
    onClose();
  };

  const off = discountPercent(product.price, product.discountPrice);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qv-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <ProductImage src={product.images[0]} alt={product.name} />
        <div className="modal__body">
          <span className="eyebrow">{product.category.replace("-", " ")}</span>
          <h2 id="qv-title">{product.name}</h2>
          <div className="price" style={{ margin: "12px 0" }}>
            <strong>{formatINR(effectivePrice(product))}</strong>
            {off > 0 && <s>{formatINR(product.price)}</s>}
          </div>
          <p style={{ color: "var(--gray)", marginBottom: 16 }}>{product.description}</p>
          <div>
            <div className="label" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Size
            </div>
            <div className="sizes">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`chip ${size === s ? "active" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="label" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Colour
            </div>
            <div className="swatches">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip ${color === c ? "active" : ""}`}
                  onClick={() => setColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="field-error">{error}</p>}
          <button className="btn btn--full" type="button" onClick={add} disabled={!product.inStock}>
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="btn btn--ghost btn--full" style={{ marginTop: 10 }} onClick={onClose}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
