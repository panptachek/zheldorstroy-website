import { useState } from 'react';
import { Button } from '../ui/Button';
import { heroTitle, heroSubtitle, metrics } from '../../content/siteContent';
import { isTestMode } from '../../utils/testMode';

const heroVariants = ['/assets/hero-v3-1.webp', '/assets/hero-v3-2.webp', '/assets/hero-v3-3.webp'];

export function HeroSection() {
  const testMode = isTestMode();
  const [active, setActive] = useState(0);

  return (
    <section id="home" className="section hero">
      <div className="container hero__layout">
        <div>
          <p className="eyebrow">Industrial Luxury / Engineering Power</p>
          <h1>{heroTitle}</h1>
          <p className="muted">{heroSubtitle}</p>
          <div className="hero__actions">
            <Button>Обсудить проект</Button>
            <Button variant="ghost">Смотреть кейсы</Button>
          </div>
        </div>
        <div>
          <div className="hero__media" role="img" aria-label="Высокоскоростной поезд в фирменных цветах">
            <img
              src={heroVariants[active]}
              alt="Высокоскоростной поезд ООО ЖЕЛДОРСТРОЙ"
              loading="eager"
              fetchPriority="high"
              width="1365"
              height="768"
              decoding="async"
            />
          </div>
          <div className="hero__switch">
            {heroVariants.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`hero-dot ${active === idx ? 'is-active' : ''}`}
                onClick={() => {
                  if (!testMode) setActive(idx);
                }}
                aria-label={`Показать hero-вариант ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
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
