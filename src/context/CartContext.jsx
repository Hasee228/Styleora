import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage";
import { effectivePrice } from "../utils/format";
import {
  COUPONS,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
} from "../data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "styleora-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadJSON(STORAGE_KEY, []));
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    saveJSON(STORAGE_KEY, items);
  }, [items]);

  const addItem = (product, { size, color, quantity = 1 }) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.size === size && i.color === color
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.images[0],
          price: effectivePrice(product),
          originalPrice: product.price,
          size,
          color,
          quantity,
          inStock: product.inStock,
        },
      ];
    });
  };

  const removeItem = (key) => {
    setItems((prev) =>
      prev.filter((i) => `${i.id}-${i.size}-${i.color}` !== key)
    );
  };

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        `${i.id}-${i.size}-${i.color}` === key ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode("");
    setCouponError("");
  };

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setCouponError("Enter a coupon code.");
      setCouponCode("");
      return false;
    }
    if (!COUPONS[normalized]) {
      setCouponError("This coupon is not valid.");
      setCouponCode("");
      return false;
    }
    setCouponCode(normalized);
    setCouponError("");
    return true;
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponError("");
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const coupon = couponCode ? COUPONS[couponCode] : null;
    let discount = 0;
    if (coupon?.type === "percent") {
      discount = Math.round((subtotal * coupon.value) / 100);
    } else if (coupon?.type === "flat") {
      discount = Math.min(coupon.value, subtotal);
    }
    const afterDiscount = Math.max(0, subtotal - discount);
    const shipping =
      afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD
        ? 0
        : STANDARD_SHIPPING;
    const total = afterDiscount + shipping;
    return { subtotal, discount, shipping, total, coupon };
  }, [items, couponCode]);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const value = {
    items,
    count,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon,
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
