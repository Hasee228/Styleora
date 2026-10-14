import { Link } from "react-router-dom";

const tones = {
  dresses: "#e8c9c5",
  tops: "#d8c4b0",
  "ethnic-wear": "#c9b7a4",
  jeans: "#b7c0c7",
  accessories: "#e4d5c5",
};

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.id}`} className="category-card">
      <h3>{category.name}</h3>
      <span>Explore</span>
      <div
        className="category-card__art"
        style={{ background: tones[category.id] || "#e8c9c5" }}
        aria-hidden="true"
      />
    </Link>
  );
}
