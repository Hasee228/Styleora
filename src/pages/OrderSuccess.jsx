import { Link, Navigate, useLocation } from "react-router-dom";
import { formatINR } from "../utils/format";

export default function OrderSuccess() {
  const { state } = useLocation();
  const stored = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("styleora-last-order"));
    } catch {
      return null;
    }
  })();
  const order = state || stored;
  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="container success">
      <span className="eyebrow">Confirmed</span>
      <h1>Thank you for your order</h1>
      <p style={{ color: "var(--gray)" }}>
        This is a demonstration confirmation. No payment was taken and no parcel will ship.
      </p>
      <div className="order-no">Order {order.orderNo}</div>
      <p>
        A mock note would be sent to <strong>{order.customer?.email}</strong>. Total{" "}
        <strong>{formatINR(order.totals.total)}</strong>.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
        <Link to="/shop" className="btn">
          Continue Shopping
        </Link>
        <Link to="/" className="btn btn--ghost">
          Back Home
        </Link>
      </div>
    </div>
  );
}
