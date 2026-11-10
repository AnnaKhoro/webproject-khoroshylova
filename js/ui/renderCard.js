// Розмітка картки випуску з класів UI-кіту (ПР4). Повертає рядок, у DOM нічого не вставляє.
import { escapeHtml, formatDate } from '../utils/format.js';

export function renderCard(episode) {
  const featured = episode.isFeatured === true;
  const badge = featured ? '<span class="card__badge">Вибір редакції</span>' : '';
  const isNew = episode.isNew() ? ' · <b>новий</b>' : '';

  return `
    <article class="card${featured ? ' card--featured' : ''}">
      ${badge}
      <div class="card__image" aria-hidden="true">#${String(episode.id).padStart(2, '0')}</div>
      <h3 class="card__title">${escapeHtml(episode.title)}</h3>
      <p class="card__subtitle">${escapeHtml(episode.podcastTitle)} · ${escapeHtml(episode.category)}</p>
      <p class="card__text">${escapeHtml(episode.description)}</p>
      <p class="card__text">${episode.duration} · ${formatDate(episode.publishedAt)}${isNew}</p>
      <div class="card__footer">
          <button class="button button--primary button--small" type="button" data-action="open" data-id="${episode.id}">Детальніше</button>
      </div>
    </article>`;
}
