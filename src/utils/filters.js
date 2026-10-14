import { effectivePrice } from "./format";
import { NAV_CATEGORIES } from "../data/products";

export const uniqueSizes = (items) => {
  const set = new Set();
  items.forEach((p) => p.sizes.forEach((s) => set.add(s)));
  return Array.from(set);
};

export const uniqueColors = (items) => {
  const set = new Set();
  items.forEach((p) => p.colors.forEach((c) => set.add(c)));
  return Array.from(set);
};

export const categoryIdsForRoute = (category) => {
  const nav = NAV_CATEGORIES.find((c) => c.id === category);
  if (nav) return nav.filter;
  return [category];
};

export const applyFilters = (items, filters) => {
  let list = [...items];

  if (filters.categories?.length) {
    list = list.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.query) {
    const q = filters.query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.minPrice != null) {
    list = list.filter((p) => effectivePrice(p) >= Number(filters.minPrice));
  }
  if (filters.maxPrice != null) {
    list = list.filter((p) => effectivePrice(p) <= Number(filters.maxPrice));
  }

  if (filters.sizes?.length) {
    list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
  }

  if (filters.colors?.length) {
    list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
  }

  switch (filters.sort) {
    case "price-asc":
      list.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case "price-desc":
      list.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case "popular":
      list.sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating);
      break;
    case "newest":
    default:
      list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }

  return list;
};
