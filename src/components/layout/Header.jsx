import { navItems } from '../../content/siteContent';

export function Header() {
  return (
    <header className="header">
      <div className="container header__row">
        <a href="#home" className="header__brand">ООО ЖЕЛДОРСТРОЙ</a>
        <nav className="header__nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>{item.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
