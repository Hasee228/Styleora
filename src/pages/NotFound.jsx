import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="eyebrow">Misplaced</span>
      <h1>404</h1>
      <p style={{ color: "var(--gray)", margin: "12px 0 28px" }}>
        This page has stepped out of the atelier.
      </p>
      <Link to="/" className="btn">
        Return Home
      </Link>
    </div>
  );
}
