export const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const discountPercent = (price, discountPrice) => {
  if (!discountPrice || discountPrice >= price) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
};

export const effectivePrice = (product) =>
  product.discountPrice && product.discountPrice < product.price
    ? product.discountPrice
    : product.price;

export const slugify = (value) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");
