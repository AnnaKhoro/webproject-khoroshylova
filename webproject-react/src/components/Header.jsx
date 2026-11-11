// Шапка сайту: логотип, навігація (блок nav з UI-кіту) і кнопка входу
import { Button } from './Button.jsx';

const LINKS = ['Головна', 'Каталог', 'Пошук', 'Вибране'];

export function Header({ active = 'Каталог' }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="header__logo" href="/">Хвиля</a>
        <div className="header__actions">
          <nav className="nav" aria-label="Основна навігація">
            {LINKS.map((link) => (
              <a
                key={link}
                className={link === active ? 'nav__link nav__link--active' : 'nav__link'}
                href="#"
                aria-current={link === active ? 'page' : undefined}
              >
                {link}
              </a>
            ))}
          </nav>
          <Button size="small">Увійти</Button>
        </div>
      </div>
    </header>
  );
}
