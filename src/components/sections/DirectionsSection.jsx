import { directions } from '../../content/siteContent';

export function DirectionsSection() {
  return (
    <section id="directions" className="section">
      <div className="container">
        <h2>Направления</h2>
        <div className="grid-4">
          {directions.map((item) => (
            <article className="card" key={item.title}>
              <div className="icon-placeholder">SVG</div>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
