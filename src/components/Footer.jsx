import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="logo">
            Styleora
          </Link>
          <p>
            A house of considered women’s fashion — silhouettes, textiles, and
            finishing that speak quietly and last.
          </p>
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <Twitter size={16} />
            </a>
          </div>
        </div>
        <div>
          <h4>Maison</h4>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Client Care</h4>
          <ul>
            <li>
              <Link to="/shipping">Shipping</Link>
            </li>
            <li>
              <Link to="/returns">Returns</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li>
              <Link to="/new-arrivals">New Arrivals</Link>
            </li>
            <li>
              <Link to="/shop">All Products</Link>
            </li>
            <li>
              <Link to="/category/dresses">Dresses</Link>
            </li>
            <li>
              <Link to="/category/ethnic-wear">Ethnic Wear</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Styleora. Demo storefront only.</span>
        <span>Crafted for considered dressing.</span>
      </div>
    </footer>
  );
}
