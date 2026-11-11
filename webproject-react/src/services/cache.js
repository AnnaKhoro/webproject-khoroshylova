// Кеш відповідей у localStorage: кожен запис має мітку часу й строк придатності (TTL).
// Сховище може бути недоступним (приватний режим, Node.js, переповнення) — тоді кеш просто не працює.
export function readCache(key, ttlMs) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (Date.now() - entry.savedAt > ttlMs) {   // строк минув — запис застарів
      localStorage.removeItem(key);
      return null;
    }
    return entry;                               // { savedAt, data }
  } catch {
    return null;
  }
}

export function writeCache(key, data) {
  const entry = { savedAt: Date.now(), data };
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    console.warn('Кеш не збережено:', error.message);
  }
  return entry;
}
