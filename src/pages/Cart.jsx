import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { formatINR } from "../utils/format";
import { FREE_SHIPPING_THRESHOLD } from "../data/products";

export default function Cart() {
  const { items, updateQuantity, removeItem, totals, applyCoupon, removeCoupon, couponCode, couponError } = useCart();
  const { notify } = useToast();
  const [code, setCode] = useState("");

  const onRemove = (key) => {
    removeItem(key);
    notify("Removed from cart");
  };

  if (!items.length) {
    return (
      <div className="empty-state">
        <ShoppingBag size={48} />
        <h2>Your cart is empty</h2>
        <p>The edit is waiting. Begin with a dress, a kurta, or a finishing piece.</p>
        <Link to="/shop" className="btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Bag</span>
          <h1>Shopping Cart</h1>
        </div>
      </div>
      <div className="container cart-layout">
        <div>
          {items.map((item) => (
            <CartItem
              key={`${item.id}-${item.size}-${item.color}`}
              item={item}
              onQty={updateQuantity}
              onRemove={onRemove}
            />
          ))}
          <Link to="/shop" className="btn btn--ghost" style={{ marginTop: 24 }}>
            Continue Shopping
          </Link>
        </div>
        <aside className="summary">
          <h2>Order Summary</h2>
          <div className="row">
            <span>Subtotal</span>
            <span>{formatINR(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="row">
              <span>Discount {totals.coupon?.label}</span>
              <span>− {formatINR(totals.discount)}</span>
            </div>
          )}
          <div className="row">
            <span>Shipping</span>
            <span>{totals.shipping === 0 ? "Complimentary" : formatINR(totals.shipping)}</span>
          </div>
          {totals.shipping > 0 && (
            <p style={{ fontSize: 12, color: "var(--gray)" }}>
              Add {formatINR(FREE_SHIPPING_THRESHOLD - (totals.subtotal - totals.discount))} more for free shipping.
            </p>
          )}
          <div className="coupon">
            <label className="sr-only" htmlFor="coupon">
              Coupon code
            </label>
            <input
              id="coupon"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Coupon: STYLEORA10"
            />
            <button
              className="btn"
              type="button"
              onClick={() => {
                const ok = applyCoupon(code);
                if (ok) notify("Coupon applied");
              }}
            >
              Apply
            </button>
          </div>
          {couponError && <p className="field-error">{couponError}</p>}
          {couponCode && (
            <button className="linkish" type="button" onClick={removeCoupon}>
              Remove {couponCode}
            </button>
          )}
          <p style={{ fontSize: 12, color: "var(--gray)", marginTop: 8 }}>
            Demo codes: STYLEORA10, WELCOME20, FLAT500
          </p>
          <div className="row total">
            <span>Total</span>
            <span>{formatINR(totals.total)}</span>
          </div>
          <Link to="/checkout" className="btn btn--full" style={{ marginTop: 18 }}>
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </>
  );
}
