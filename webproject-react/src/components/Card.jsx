// Картка випуску з UI-кіту. Отримує екземпляр моделі Episode і функцію onOpen, яку викликає кнопка.
// Модифікатор card--featured вмикається для випусків «Вибір редакції».
import { Button } from './Button.jsx';
import { formatDate } from '../utils/format.js';

// Ініціали подкасту для обкладинки: «Код без кави» → «КБ»
function initials(title) {
  const words = title.match(/[\p{L}\d]+/gu) ?? ['?'];
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join('');
}

export function Card({ episode, onOpen }) {
  const featured = episode.isFeatured === true;
  return (
    <article className={featured ? 'card card--featured' : 'card'}>
      {featured && <span className="card__badge">Вибір редакції</span>}
      <div className="card__image" aria-hidden="true">{initials(episode.podcastTitle)}</div>
      <h3 className="card__title">{episode.title}</h3>
      <p className="card__subtitle">{episode.podcastTitle} · {episode.category}</p>
      <p className="card__text">{episode.description}</p>
      <div className="card__footer">
        <span>
          {episode.duration} · {formatDate(episode.publishedAt)}
          {episode.isNew() && <> · <b>новий</b></>}
        </span>
        <Button size="small" onClick={() => onOpen(episode.id)}>Детальніше</Button>
      </div>
    </article>
  );
}
