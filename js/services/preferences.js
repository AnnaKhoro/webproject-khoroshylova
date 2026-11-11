// Збереження стану фільтрів каталогу між сеансами (localStorage).
// Зберігаються лише налаштування перегляду — нічого, що стосується облікового запису чи прав доступу.
const KEY = 'khvylia:filters';
const DEFAULTS = { query: '', category: null, sort: 'title' };

export function loadFilters() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY)) ?? {};
    // перевіряємо збережене: у сховищі могло опинитися що завгодно
    return {
      query: typeof saved.query === 'string' ? saved.query : DEFAULTS.query,
      category: typeof saved.category === 'string' ? saved.category : DEFAULTS.category,
      sort: ['title', 'date'].includes(saved.sort) ? saved.sort : DEFAULTS.sort,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveFilters({ query, category, sort }) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ query, category, sort }));
  } catch {
    // сховище недоступне — фільтри просто не запам'ятаються
  }
}

export function clearFilters() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // нічого не робимо
  }
  return { ...DEFAULTS };
}
