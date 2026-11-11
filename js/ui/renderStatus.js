// Розмітка станів завантаження, помилки й порожнього результату з компонентів UI-кіту
import { escapeHtml } from '../utils/format.js';
import { describeError } from '../utils/errors.js';

// Скелет: сірі «заготовки» карток на місці майбутнього переліку
export function renderSkeleton(count = 6) {
  const card = `
    <div class="card card--skeleton" aria-hidden="true">
      <div class="card__image"></div>
      <div class="card__line"></div>
      <div class="card__line card__line--short"></div>
      <div class="card__line"></div>
    </div>`;
  return `<span class="visually-hidden" role="status">Завантаження…</span>${card.repeat(count)}`;
}

// Помилка: що сталося, що робити, технічна причина й кнопка повтору останнього запиту
export function renderError(error, online = true) {
  const { title, advice } = describeError(error, { online });
  return `
    <div class="alert alert--error" role="alert">
      <span class="alert__icon" aria-hidden="true">✕</span>
      <span class="alert__text">
        <b>${title}</b> ${advice}
        <br><small>Причина: ${escapeHtml(online ? error.message : 'браузер не підключений до мережі')}</small>
        <br><button class="button button--secondary button--small" type="button" data-action="retry">Спробувати ще раз</button>
      </span>
    </div>`;
}

// Порожній результат — НЕ помилка: звичайне інформаційне повідомлення з підказкою
export function renderEmpty(query = '') {
  const what = query.trim() ? ` «${escapeHtml(query.trim())}»` : '';
  return `
    <div class="alert" role="status">
      <span class="alert__icon" aria-hidden="true">ℹ</span>
      <span class="alert__text"><b>За вашим запитом${what} нічого не знайдено.</b> Спробуйте інше слово або виберіть іншу категорію.</span>
    </div>`;
}
