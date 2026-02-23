import { jobsIntro } from '../../content/siteContent';

export function JobsSection() {
  return (
    <section id="jobs" className="section">
      <div className="container">
        <h2>Вакансии</h2>
        <p className="muted">{jobsIntro}</p>
        <div className="card">
          <p>Интеграция HH.ru: API-first, fallback — server-side fetch с кэшированием 15 минут.</p>
        </div>
      </div>
    </section>
  );
}
