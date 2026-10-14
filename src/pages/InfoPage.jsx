export default function InfoPage({ title, children }) {
  return (
    <div className="container info-page">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
