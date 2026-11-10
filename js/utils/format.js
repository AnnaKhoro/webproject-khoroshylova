// Дрібні допоміжні функції форматування. Без звернень до document і без стану застосунку.

// 2520 → «42 хв», 3660 → «1 год 01 хв»
export function formatDuration(seconds) {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} хв`;
  const hours = Math.floor(minutes / 60);
  return `${hours} год ${String(minutes % 60).padStart(2, '0')} хв`;
}

// '2026-11-03' → «03.11.2026»
export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('uk-UA');
}

// Кількість днів між датою публікації та «сьогодні»
export function daysSince(isoDate, today = new Date()) {
  const ms = today - new Date(isoDate);
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}

// Екранування спецсимволів HTML перед вставлянням тексту в розмітку (захист від XSS)
export function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
