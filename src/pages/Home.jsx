import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowUpRight, ShieldCheck, Sparkles, Truck, Undo2 } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import Newsletter from "../components/Newsletter";
import QuickViewModal from "../components/QuickViewModal";
import { CATEGORIES, products, testimonials } from "../data/products";

const reasons = [
  {
    icon: Sparkles,
    title: "Quality Fashion",
    text: "Textiles and finishing chosen for drape, longevity, and a quiet presence.",
  },
  {
    icon: Undo2,
    title: "Easy Returns",
    text: "A 7-day exchange window on unworn pieces, with prepaid labels on eligible orders.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    text: "This is a demo checkout — no real payments are processed, ever.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    text: "Complimentary shipping on orders above ₹1,499 across India.",
  },
];

export default function Home() {
  const [quick, setQuick] = useState(null);
  const arrivals = products.filter((p) => p.isNew).slice(0, 8);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const bestsellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <>
      <HeroSection />

      <section className="section feature-banner">
        <div className="container feature-banner__inner">
          <div className="feature-banner__copy">
            <span className="feature-banner__index">01 / The collection</span>
            <span className="eyebrow">A considered wardrobe</span>
            <h2>Wear the feeling.</h2>
            <p>
              Beautifully uncomplicated pieces for wherever the day takes you.
              Find your new favourites in the Spring Summer edit.
            </p>
            <Link to="/shop" className="feature-banner__link">
              Explore the collection <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="feature-banner__art" aria-hidden="true">
            <div className="feature-banner__art-frame">
              <span className="feature-banner__art-word">STYLEORA</span>
              <div className="feature-banner__art-shape feature-banner__art-shape--back" />
              <div className="feature-banner__art-shape feature-banner__art-shape--front" />
              <span className="feature-banner__art-caption">Softness in every detail</span>
            </div>
            <span className="feature-banner__seal">SS<br />26</span>
          </div>
        </div>
      </section>

      <section className="section home-note">
        <div className="container home-note__layout">
          <div className="home-note__content">
            <span className="eyebrow">The atelier edit</span>
            <h2>Made for moments that matter.</h2>
            <p>
              From polished city days to candlelit celebrations, every piece is
              designed to feel effortless, intentional, and distinctly yours.
            </p>
            <div className="home-note__points">
              <div>
                <strong>Natural fibres</strong>
                <span>Silks, linen, and cotton made to feel beautiful in real life.</span>
              </div>
              <div>
                <strong>Refined silhouettes</strong>
                <span>Thoughtful cuts that move with you and flatter the everyday.</span>
              </div>
            </div>
          </div>

          <div className="home-note__panel">
            <article className="mini-feature mini-feature--primary">
              <span className="mini-feature__label">Signature</span>
              <h3>Soft tailoring, better living.</h3>
              <p>Elevated essentials for a more considered wardrobe.</p>
            </article>
            <article className="mini-feature mini-feature--secondary">
              <span className="mini-feature__label">This week</span>
              <h3>Weekend in bloom.</h3>
              <p>Fresh florals and featherlight layers for low-key luxury.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Collections</span>
            <h2>Shop by Category</h2>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--beige">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Just in</span>
            <h2>New Arrivals</h2>
            <p>The latest silhouettes from the Styleora atelier.</p>
          </div>
          <ProductGrid products={arrivals} onQuickView={setQuick} />
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link to="/new-arrivals" className="btn btn--ghost">
              View All Arrivals
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Edited</span>
            <h2>Trending Now</h2>
          </div>
          <ProductGrid products={trending} onQuickView={setQuick} />
        </div>
      </section>

      <section className="container">
        <div className="promo">
          <div className="promo__copy">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,.6)" }}>
              Manifesto
            </span>
            <h2>Your Style, Your Story.</h2>
            <p>
              Dress for the life you actually live — ceremonies, city days, and
              the in-between. Styleora is a wardrobe of considered pieces, not
              costumes.
            </p>
            <Link to="/shop" className="btn">
              Explore the Edit
            </Link>
          </div>
          <div className="promo__art" aria-hidden="true" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Most loved</span>
            <h2>Best Sellers</h2>
          </div>
          <ProductGrid products={bestsellers} onQuickView={setQuick} />
        </div>
      </section>

      <section className="section section--beige">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Atelier promise</span>
            <h2>Why Choose Us</h2>
          </div>
          <div className="why-grid">
            {reasons.map((r) => (
              <article key={r.title} className="why-card">
                <r.icon size={28} />
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Client notes</span>
            <h2>Testimonials</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <article key={t.id} className="testimonial">
                <div className="stars" aria-label={`${t.rating} stars`}>
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>
                <p>“{t.quote}”</p>
                <div className="who">
                  {t.name} · {t.city}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      {quick && <QuickViewModal product={quick} onClose={() => setQuick(null)} />}
    </>
  );
}
