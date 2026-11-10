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
  return episodes.map(renderCard).join('');
}

// Мітки категорій з кількістю випусків; поточна позначена модифікатором tag--active
export function renderCategoryTags(categories, counts, activeSlug = '') {
  const all = `<a class="tag${activeSlug ? '' : ' tag--active'}" href="catalog.html">Усі</a>`;
  const items = categories.map((c) => `
    <a class="tag${c.slug === activeSlug ? ' tag--active' : ''}" href="?category=${c.slug}">${escapeHtml(c.name)} (${counts[c.name] ?? 0})</a>`);
  return all + items.join('');
}
