import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setSuccess("");
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSuccess("You are on the list. Welcome to Styleora.");
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div className="container">
        <span className="eyebrow">Correspondence</span>
        <h2>Stories, drops, and invitations</h2>
        <p style={{ color: "var(--gray)", marginTop: 10 }}>
          Join the Styleora list. No noise — only considered news.
        </p>
        <form onSubmit={submit} noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn" type="submit">
            Subscribe
          </button>
        </form>
        {error && <p className="msg field-error">{error}</p>}
        {success && <p className="msg">{success}</p>}
      </div>
    </section>
  );
}
