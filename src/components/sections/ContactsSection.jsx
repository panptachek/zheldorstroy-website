import { contacts } from '../../content/siteContent';

export function ContactsSection() {
  return (
    <section id="contacts" className="section">
      <div className="container">
        <h2>Контакты</h2>
        <div className="grid-2">
          <article className="card">
            <h3>{contacts.legalName}</h3>
            <p>{contacts.address}</p>
            <p><a href={`tel:${contacts.phone.replace(/[^\d+]/g, '')}`}>{contacts.phone}</a></p>
            <p><a href={`mailto:${contacts.email}`}>{contacts.email}</a></p>
          </article>
          <article className="card">
            <h3>Карта</h3>
            <p className="muted">Яндекс.Карта подключается lazy-load скриптом на клиенте для сохранения performance.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
