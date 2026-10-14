import { useState } from "react";
import { FALLBACK_IMAGE } from "../data/products";

export default function ProductImage({ src, alt, className, loading = "lazy" }) {
  const [broken, setBroken] = useState(false);
  return (
    <img
      className={className}
      src={broken || !src ? FALLBACK_IMAGE : src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}
