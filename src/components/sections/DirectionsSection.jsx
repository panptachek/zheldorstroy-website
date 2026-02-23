import { directions } from '../../content/siteContent';

export function DirectionsSection() {
  return (
    <section id="directions" className="section">
      <div className="container">
        <h2>Направления</h2>
        <div className="card" style={{ marginBottom: 16 }}>
          <img src="/assets/directions-icons-sheet.svg" alt="Набор векторных иконок направлений ЖЕЛДОРСТРОЙ" style={{ width: '100%', maxWidth: 520, display: 'block' }} />
        </div>
        <div className="grid-4">
          {directions.map((item, idx) => (
            <article className="card" key={item.title}>
              <div className="icon-placeholder" aria-hidden="true">{idx + 1}</div>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
