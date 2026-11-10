// Вміст модального вікна з даними одного випуску
import { escapeHtml, formatDate } from '../utils/format.js';

export function renderDetails(episode) {
  const note = episode.isFeatured
    ? `<div class="alert alert--success"><span class="alert__icon" aria-hidden="true">★</span><span class="alert__text"><b>Вибір редакції.</b> ${escapeHtml(episode.editorNote)}</span></div>`
    : '';
  return `
    <h3 class="modal__title" id="episode-modal-title">${escapeHtml(episode.title)}</h3>
    <p class="card__subtitle">${escapeHtml(episode.podcastTitle)} · ${escapeHtml(episode.category)}</p>
    <p>${escapeHtml(episode.description)}</p>
    <p class="card__text">Тривалість: ${episode.duration} · опубліковано ${formatDate(episode.publishedAt)}${episode.isNew() ? ' · новий випуск' : ''}</p>
    ${note}`;
}
