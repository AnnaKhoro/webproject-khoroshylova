// Доступ до публічного REST API iTunes Search (каталог подкастів Apple).
// Лише мережа й дані — жодних звернень до DOM. На темі 9 BASE_URL зміниться на власний API.
const BASE_URL = 'https://itunes.apple.com';

// Спільна функція запиту: перевіряє response.ok і кидає помилку з кодом стану
async function request(path, params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}${path}?${query}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText || 'помилка сервера'}`);
  }
  return response.json();
}

// Випуски україномовних подкастів за пошуковим словом (сирі записи API)
export async function searchEpisodes(term, limit = 8) {
  const data = await request('/search', {
    term,
    country: 'UA',
    media: 'podcast',
    entity: 'podcastEpisode',
    limit,
  });
  return data.results ?? [];
}
