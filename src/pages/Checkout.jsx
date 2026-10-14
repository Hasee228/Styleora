import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatINR } from "../utils/format";

const initial = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  delivery: "standard",
  payment: "cod",
};

export default function Checkout() {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  if (!items.length) return <Navigate to="/cart" replace />;

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!/^[6-9]\d{9}$/.test(form.phone)) next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.address.trim().length < 8) next.address = "Please enter a full address.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.state.trim()) next.state = "State is required.";
    if (!/^\d{6}$/.test(form.pincode)) next.pincode = "Enter a 6-digit pincode.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const place = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const orderNo = `SO${Date.now().toString().slice(-8)}`;
    const snapshot = {
      orderNo,
      items,
      totals,
      customer: form,
      placedAt: new Date().toISOString(),
    };
    sessionStorage.setItem("styleora-last-order", JSON.stringify(snapshot));
    clearCart();
    navigate("/order-success", { state: snapshot });
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">Demo checkout</span>
          <h1>Checkout</h1>
          <p style={{ color: "var(--gray)", marginTop: 10 }}>No real payment is processed.</p>
        </div>
      </div>
      <div className="container checkout-layout">
        <form className="checkout-form" onSubmit={place} noValidate>
          <h2>Customer details</h2>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" value={form.name} onChange={set("name")} autoComplete="name" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div className="grid-2">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" value={form.phone} onChange={set("phone")} autoComplete="tel" />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
          </div>
          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea id="address" value={form.address} onChange={set("address")} autoComplete="street-address" />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>
          <div className="grid-2">
            <div className="field">
              <label htmlFor="city">City</label>
              <input id="city" value={form.city} onChange={set("city")} />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>
            <div className="field">
              <label htmlFor="state">State</label>
              <input id="state" value={form.state} onChange={set("state")} />
              {errors.state && <span className="field-error">{errors.state}</span>}
            </div>
          </div>
          <div className="field">
            <label htmlFor="pincode">Pincode</label>
            <input id="pincode" value={form.pincode} onChange={set("pincode")} inputMode="numeric" />
            {errors.pincode && <span className="field-error">{errors.pincode}</span>}
          </div>

          <h2>Delivery</h2>
          <div className="pay-options">
            <label className="pay-option">
              <input
                type="radio"
                name="delivery"
                value="standard"
                checked={form.delivery === "standard"}
                onChange={set("delivery")}
              />
              Standard (4–6 days) — included in shipping estimate
            </label>
            <label className="pay-option">
              <input
                type="radio"
                name="delivery"
                value="express"
                checked={form.delivery === "express"}
                onChange={set("delivery")}
              />
              Express (2–3 days) — demo only, no extra charge
            </label>
          </div>

          <h2>Payment method</h2>
          <div className="pay-options">
            <label className="pay-option">
              <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={set("payment")} />
              Cash on Delivery (demo)
            </label>
            <label className="pay-option">
              <input type="radio" name="payment" value="upi" checked={form.payment === "upi"} onChange={set("payment")} />
              UPI (demo — not processed)
            </label>
            <label className="pay-option">
              <input type="radio" name="payment" value="card" checked={form.payment === "card"} onChange={set("payment")} />
              Card (demo — not processed)
            </label>
          </div>

          <button className="btn" type="submit">
            Place Order
          </button>
        </form>

        <aside className="summary">
          <h2>Order summary</h2>
          {items.map((i) => (
            <div className="row" key={`${i.id}-${i.size}-${i.color}`}>
              <span>
                {i.name} × {i.quantity}
              </span>
              <span>{formatINR(i.price * i.quantity)}</span>
            </div>
          ))}
          <div className="row">
            <span>Subtotal</span>
            <span>{formatINR(totals.subtotal)}</span>
          </div>
          <div className="row">
            <span>Discount</span>
            <span>− {formatINR(totals.discount)}</span>
          </div>
          <div className="row">
            <span>Shipping</span>
            <span>{totals.shipping === 0 ? "Complimentary" : formatINR(totals.shipping)}</span>
          </div>
          <div className="row total">
            <span>Total</span>
            <span>{formatINR(totals.total)}</span>
          </div>
          <Link to="/cart" className="btn btn--ghost btn--full" style={{ marginTop: 16 }}>
            Back to cart
          </Link>
        </aside>
      </div>
    </>
  );
}
