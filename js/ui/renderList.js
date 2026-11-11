// Розмітка переліку карток і фільтра категорій
import { renderCard } from './renderCard.js';
import { escapeHtml } from '../utils/format.js';
import { renderEmpty } from './renderStatus.js';

// map перетворює кожен випуск на рядок розмітки, join('') склеює їх в один рядок
export function renderList(episodes, favorites = [], query = '') {
  if (episodes.length === 0) return renderEmpty(query);   // окремий стан, а не помилка
  return episodes.map((episode) => renderCard(episode, favorites.includes(episode.id))).join('');
}

// Кнопки категорій з кількістю випусків; поточна позначена модифікатором tag--active і aria-pressed
export function renderCategoryTags(categories, counts, activeSlug = null) {
  const tag = (slug, label) => {
    const active = slug === (activeSlug ?? '');
    return `<button class="tag${active ? ' tag--active' : ''}" type="button" data-category="${slug}" aria-pressed="${active}">${label}</button>`;
  };
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  return tag('', `Усі (${total})`) + categories.map((c) => tag(c.slug, `${escapeHtml(c.name)} (${counts[c.name] ?? 0})`)).join('');
}
