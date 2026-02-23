import { aboutText } from '../../content/siteContent';

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2>О компании</h2>
        <p className="muted">{aboutText}</p>
      </div>
    </section>
  );
}
