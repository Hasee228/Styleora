import { Link } from "react-router-dom";
import { formatINR } from "../utils/format";
import ProductImage from "./ProductImage";

export default function CartItem({ item, onQty, onRemove }) {
  const key = `${item.id}-${item.size}-${item.color}`;
  return (
    <article className="cart-item">
      <Link to={`/product/${item.id}`}>
        <ProductImage src={item.image} alt={item.name} />
      </Link>
      <div>
        <Link to={`/product/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>
        <p style={{ color: "var(--gray)", fontSize: 14, margin: "6px 0 12px" }}>
          {item.size} · {item.color}
        </p>
        <div className="qty" aria-label="Quantity">
          <button type="button" onClick={() => onQty(key, item.quantity - 1)} aria-label="Decrease">
            −
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onQty(key, item.quantity + 1)} aria-label="Increase">
            +
          </button>
        </div>
        <button className="linkish" style={{ marginTop: 12 }} type="button" onClick={() => onRemove(key)}>
          Remove
        </button>
      </div>
      <strong>{formatINR(item.price * item.quantity)}</strong>
    </article>
  );
}
