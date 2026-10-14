import Shop from "./Shop";
import { products } from "../data/products";

export default function NewArrivals() {
  return (
    <Shop
      title="New Arrivals"
      eyebrow="Just in"
      seed={products.filter((p) => p.isNew)}
    />
  );
}
