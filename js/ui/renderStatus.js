// Розмітка станів завантаження й помилки з компонентів UI-кіту
import { escapeHtml } from '../utils/format.js';

// Скелет: сірі «заготовки» карток на місці майбутнього переліку
export function renderSkeleton(count = 6) {
  const card = `
    <div class="card card--skeleton" aria-hidden="true">
      <div class="card__image"></div>
      <div class="card__line"></div>
      <div class="card__line card__line--short"></div>
      <div class="card__line"></div>
    </div>`;
  return `<span class="visually-hidden" role="status">Завантаження каталогу…</span>${card.repeat(count)}`;
}

// Помилка: що сталося, технічна причина й кнопка повтору (data-action="retry")
export function renderError(error) {
  return `
    <div class="alert alert--error" role="alert">
      <span class="alert__icon" aria-hidden="true">✕</span>
      <span class="alert__text">
        <b>Не вдалося завантажити каталог.</b> Перевірте підключення до інтернету й спробуйте ще раз.
        <br><small>Причина: ${escapeHtml(error.message)}</small>
        <br><button class="button button--secondary button--small" type="button" data-action="retry">Спробувати ще раз</button>
      </span>
    </div>`;
}
