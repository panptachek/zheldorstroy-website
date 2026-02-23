import { pressCategories } from '../../content/siteContent';

export function PressSection() {
  return (
    <section id="press" className="section">
      <div className="container">
        <h2>Пресс-центр</h2>
        <div className="chips">
          {pressCategories.map((c) => <span key={c} className="chip">{c}</span>)}
        </div>
        <p className="muted">SEO-friendly URL структура: /press/:category/:slug</p>
      </div>
    </section>
  );
}
