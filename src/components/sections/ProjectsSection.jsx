import { projects } from '../../content/siteContent';

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Флагманские проекты</h2>
        <div className="card" style={{ marginBottom: 16 }}>
          <img src="/assets/russia-projects-map.svg" alt="Карта России с выделенными проектными регионами ЖЕЛДОРСТРОЙ" style={{ width: '100%', display: 'block' }} />
        </div>
        <div className="grid-4">
          {projects.map((project) => (
            <article className="card" key={project.name}>
              <h3>{project.name}</h3>
              <p className="muted">{project.city}</p>
              <p>{project.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
