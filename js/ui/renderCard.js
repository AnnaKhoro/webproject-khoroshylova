// Розмітка картки випуску з класів UI-кіту (ПР4). Повертає рядок, у DOM нічого не вставляє.
import { escapeHtml, formatDate } from '../utils/format.js';

export function renderCard(episode, isFavorite = false) {
  const featured = episode.isFeatured === true;
  const badge = featured ? '<span class="card__badge">Вибір редакції</span>' : '';
  const isNew = episode.isNew() ? ' · <b>новий</b>' : '';

  return `
    <article class="card${featured ? ' card--featured' : ''}">
      ${badge}
      <div class="card__image" aria-hidden="true">${escapeHtml(initials(episode.podcastTitle))}</div>
      <h3 class="card__title">${escapeHtml(episode.title)}</h3>
      <p class="card__subtitle">${escapeHtml(episode.podcastTitle)} · ${escapeHtml(episode.category)}</p>
      <p class="card__text">${escapeHtml(episode.description)}</p>
      <p class="card__text">${episode.duration} · ${formatDate(episode.publishedAt)}${isNew}</p>
      <div class="card__footer">
          <button class="button button--ghost button--small" type="button" data-action="favorite" data-id="${episode.id}" aria-pressed="${isFavorite}">${isFavorite ? '★ У вибраному' : '☆ У вибране'}</button>
          <button class="button button--primary button--small" type="button" data-action="open" data-id="${episode.id}">Детальніше</button>
      </div>
    </article>`;
}

// Ініціали подкасту для обкладинки: «Код без кави» → «КБ». Раніше тут був номер випуску,
// але id з API — 13-значні числа, які не вміщаються на обкладинці
function initials(title) {
  const letters = title.match(/[\p{L}\d]+/gu) ?? ['?'];
  return letters.slice(0, 2).map((word) => word[0].toUpperCase()).join('');
}
