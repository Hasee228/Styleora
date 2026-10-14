import { useParams } from "react-router-dom";
import Shop from "./Shop";
import { products, categoryLabel, CATEGORIES, NAV_CATEGORIES } from "../data/products";
import { categoryIdsForRoute } from "../utils/filters";
import NotFound from "./NotFound";

export default function CategoryProducts() {
  const { category } = useParams();
  const known =
    CATEGORIES.some((c) => c.id === category) ||
    NAV_CATEGORIES.some((c) => c.id === category);

  if (!known) return <NotFound />;

  const ids = categoryIdsForRoute(category);
  const title =
    NAV_CATEGORIES.find((c) => c.id === category)?.name || categoryLabel(category);
  return (
    <Shop
      title={title}
      eyebrow="Category"
      seed={products.filter((p) => ids.includes(p.category))}
      lockedCategories={ids}
    />
  );
}
