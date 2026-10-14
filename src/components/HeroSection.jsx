import { Link } from "react-router-dom";

const heroCards = [
  {
    name: "Ivory Silk",
    tone: "rose",
  },
  {
    name: "Blush Wrap",
    tone: "sand",
  },
  {
    name: "Floral Garden",
    tone: "stone",
  },
];

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__inner container">
        <div className="hero__content">
          <span className="eyebrow eyebrow--featured">Spring Summer 2026</span>
          <h1>Quiet luxury for real life.</h1>
          <p>
            Curated pieces for city days, dinner plans, and every moment in
            between — designed to feel effortless, polished, and unmistakably you.
          </p>
          <div className="hero__actions">
            <Link to="/shop" className="btn">
              Shop the edit
            </Link>
            <Link to="/new-arrivals" className="btn btn--ghost">
              New arrivals
            </Link>
          </div>
          <div className="hero__stats" aria-label="Brand stats">
            <div>
              <strong>2.4k</strong>
              <small>happy clients</small>
            </div>
            <div>
              <strong>4.8/5</strong>
              <small>average rating</small>
            </div>
            <div>
              <strong>48h</strong>
              <small>dispatch</small>
            </div>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__editorial-note">
            <span>From the atelier</span>
            <strong>Dress softly. Lead boldly.</strong>
          </div>
          {heroCards.map((card, index) => (
            <div key={card.name} className={`showcase-card showcase-card--${card.tone} showcase-card--${index + 1}`}>
              <div className="showcase-card__shape" />
              <div className="showcase-card__copy">
                <span>{card.name}</span>
                <small>Styleora atelier</small>
              </div>
            </div>
          ))}
          <div className="hero__badge">New in</div>
        </div>
      </div>
    </section>
  );
}
