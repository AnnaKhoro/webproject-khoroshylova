// Розмітка переліку карток і фільтра категорій
import { renderCard } from './renderCard.js';
import { escapeHtml } from '../utils/format.js';

// map перетворює кожен випуск на рядок розмітки, join('') склеює їх в один рядок
export function renderList(episodes) {
  if (episodes.length === 0) {
    return `
      <div class="alert alert--warning" role="status">
        <span class="alert__icon" aria-hidden="true">!</span>
        <span class="alert__text"><b>Нічого не знайдено.</b> Спробуйте інше слово або виберіть іншу категорію.</span>
      </div>`;
  }
  return episodes.map((episode) => renderCard(episode)).join('');
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
