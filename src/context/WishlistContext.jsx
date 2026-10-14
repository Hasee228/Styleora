import { createContext, useContext, useEffect, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage";
import { getProductById } from "../data/products";

const WishlistContext = createContext(null);
const STORAGE_KEY = "styleora-wishlist";

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => loadJSON(STORAGE_KEY, []));

  useEffect(() => {
    saveJSON(STORAGE_KEY, ids);
  }, [ids]);

  const has = (id) => ids.includes(id);

  const toggle = (id) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const remove = (id) => setIds((prev) => prev.filter((x) => x !== id));

  const items = ids.map(getProductById).filter(Boolean);

  return (
    <WishlistContext.Provider value={{ ids, items, has, toggle, remove }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
