import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/category/clothing", label: "Clothing" },
  { to: "/category/dresses", label: "Dresses" },
  { to: "/category/ethnic-wear", label: "Ethnic Wear" },
  { to: "/category/accessories", label: "Accessories" },
];

export default function Navbar() {
  const { count } = useCart();
  const { items } = useWishlist();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
    setOpen(false);
  };

  return (
    <>
      <div className="announce">Free Shipping on Orders Above ₹1,499</div>
      <header className="navbar">
        <div className="container navbar__inner">
          <Link to="/" className="logo">
            Styleora
          </Link>

          <div className="nav-primary">
            <button
              className="icon-btn menu-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <nav className="nav-links" aria-label="Primary">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  end={l.to === "/"}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="nav-actions">
            <button
              className="icon-btn"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <Heart size={20} />
              {items.length > 0 && <span className="count">{items.length}</span>}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <ShoppingBag size={20} />
              {count > 0 && <span className="count">{count}</span>}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="search-panel">
            <form className="container" onSubmit={onSearch}>
              <label htmlFor="nav-search" className="sr-only">
                Search products
              </label>
              <input
                id="nav-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dresses, kurtas, denim…"
                autoFocus
              />
              <button className="btn" type="submit">
                Search
              </button>
            </form>
          </div>
        )}

        {open && (
          <nav className="mobile-drawer" aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link to="/shop" onClick={() => setOpen(false)}>
              Shop All
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
