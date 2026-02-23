import { Button } from '../ui/Button';
import { metrics } from '../../content/siteContent';

export function HeroSection() {
  return (
    <section id="home" className="section hero">
      <div className="container hero__layout">
        <div>
          <p className="eyebrow">Industrial Luxury / Engineering Power</p>
          <h1>Строим железнодорожную инфраструктуру федерального масштаба</h1>
          <p className="muted">Высокоскоростные коридоры, критические узлы и энергетическая устойчивость — полный цикл от проектирования до ввода в эксплуатацию.</p>
          <div className="hero__actions">
            <Button>Обсудить проект</Button>
            <Button variant="ghost">Смотреть кейсы</Button>
          </div>
        </div>
        <div className="hero__media" role="img" aria-label="Высокоскоростной поезд в фирменных цветах">
          <span>Hero visual placeholder (Recraft v3)</span>
        </div>
      </div>
      <div className="container hero__metrics">
        {metrics.map((item) => (
          <article className="metric" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
