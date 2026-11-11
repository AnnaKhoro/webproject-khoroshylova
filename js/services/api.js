// Доступ до публічного REST API iTunes Search (каталог подкастів Apple).
// Лише мережа й дані — жодних звернень до DOM. На темі 9 BASE_URL зміниться на власний API.
import { readCache, writeCache } from './cache.js';

const BASE_URL = 'https://itunes.apple.com';
const CATALOG_CACHE_KEY = 'khvylia:catalog';
const CATALOG_TTL = 5 * 60 * 1000;             // строк придатності кешу — 5 хвилин

// Розділи каталогу «Хвилі»: за якими словами шукати випуски
export const SECTIONS = [
  { id: 1, name: 'Освіта', slug: 'education', term: 'освіта' },
  { id: 2, name: 'Наука', slug: 'science', term: 'наука' },
  { id: 3, name: 'Технології', slug: 'tech', term: 'технології' },
  { id: 4, name: 'Історія', slug: 'history', term: 'історія' },
  { id: 5, name: 'Психологія', slug: 'psychology', term: 'психологія' },
  { id: 6, name: "Кар'єра", slug: 'career', term: "кар'єра" },
];

// Категорія для записів, жанр яких не відповідає жодному розділу (трапляється в результатах пошуку)
const OTHER = { id: 7, name: 'Інше', slug: 'other' };

// Жанр Apple Podcasts → slug нашої категорії
const GENRE_TO_SLUG = {
  Education: 'education', Courses: 'education', 'How To': 'education',
  Science: 'science', 'Natural Sciences': 'science', 'Social Sciences': 'science',
  Technology: 'tech', 'Tech News': 'tech',
  History: 'history', 'Places & Travel': 'history',
  'Mental Health': 'psychology', 'Self-Improvement': 'psychology', 'Health & Fitness': 'psychology',
  Careers: 'career', Business: 'career', Entrepreneurship: 'career',
};

// Помилка HTTP з кодом стану: за полем status інтерфейс вибирає зрозуміле повідомлення
export class HttpError extends Error {
  constructor(status, statusText = '') {
    // statusText буває порожнім (HTTP/2 не передає текстовий опис), тому додаємо його лише за наявності
    super(`HTTP ${status}${statusText ? `: ${statusText}` : ''}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

// Спільна функція запиту: перевіряє response.ok і кидає помилку з кодом стану
// signal — від AbortController: дозволяє перервати запит, якщо він уже не потрібен
async function request(path, params = {}, { signal } = {}) {
  // кожне значення кодується: пробіли, & і кирилиця в пошуковому запиті не зламають адресу
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const response = await fetch(`${BASE_URL}${path}?${query}`, { signal });
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
  return response.json();
}

// Випуски україномовних подкастів за пошуковим словом (сирі записи API)
export async function searchEpisodes(term, limit = 8, options = {}) {
  const data = await request('/search', {
    term,
    country: 'UA',
    media: 'podcast',
    entity: 'podcastEpisode',
    limit,
  }, options);
  return data.results ?? [];
}

// ПЕРЕТВОРЮВАЧ: єдине місце, де чужі імена полів зіставляються з нашою моделлю.
// Захисне читання (?. і ??): будь-якого поля в записі може не бути.
export function toEpisode(raw, fallbackSlug = '') {
  const genre = raw.genres?.[0]?.name ?? raw.primaryGenreName;
  return {
    id: raw.trackId,
    podcastId: raw.collectionId ?? 0,
    podcastTitle: raw.collectionName ?? 'Невідомий подкаст',
    categorySlug: GENRE_TO_SLUG[genre] ?? fallbackSlug,
    title: raw.trackName?.trim() || 'Без назви',
    description: (raw.description ?? raw.shortDescription ?? '').trim() || 'Опис випуску відсутній',
    audioUrl: raw.episodeUrl ?? raw.previewUrl ?? '',
    durationSec: Math.round((raw.trackTimeMillis ?? 0) / 1000),
    publishedAt: raw.releaseDate?.slice(0, 10) ?? '1970-01-01',
  };
}

// Збирає з записів API ті самі три таблиці, що були в заглушці data/catalog.js,
// тому Store з ПР5 отримує дані в знайомому вигляді й не потребує змін
export function toCatalog(records) {
  const episodes = [];
  const podcasts = new Map();
  for (const { raw, fallbackSlug } of records) {
    const e = toEpisode(raw, fallbackSlug);
    if (!e.id || episodes.some((x) => x.id === e.id)) continue;   // без id або дублікат — пропускаємо
    if (!podcasts.has(e.podcastId)) {
      const section = [...SECTIONS, OTHER].find((s) => s.slug === e.categorySlug)
        ?? [...SECTIONS, OTHER].find((s) => s.slug === fallbackSlug);
      podcasts.set(e.podcastId, { id: e.podcastId, categoryId: section?.id ?? 0, title: e.podcastTitle });
    }
    episodes.push({
      id: e.id, podcastId: e.podcastId, title: e.title, description: e.description,
      audioUrl: e.audioUrl, durationSec: e.durationSec, publishedAt: e.publishedAt,
    });
  }
  const used = [...podcasts.values()].some((p) => p.categoryId === OTHER.id);
  return {
    episodes,
    podcasts: [...podcasts.values()],
    categories: [...SECTIONS, ...(used ? [OTHER] : [])].map(({ id, name, slug }) => ({ id, name, slug })),
  };
}

// Увесь каталог: спершу кеш (якщо чинний), інакше шість незалежних запитів ОДНОЧАСНО через Promise.all.
// force = true — примусове оновлення, кеш ігнорується. meta каже, звідки дані й коли їх збережено.
export async function getCatalog({ force = false } = {}) {
  const cached = force ? null : readCache(CATALOG_CACHE_KEY, CATALOG_TTL);
  if (cached) {
    return { ...cached.data, meta: { source: 'cache', savedAt: cached.savedAt } };
  }
  const results = await Promise.all(SECTIONS.map((s) => searchEpisodes(s.term)));
  const records = results.flatMap((list, i) => list.map((raw) => ({ raw, fallbackSlug: SECTIONS[i].slug })));
  const entry = writeCache(CATALOG_CACHE_KEY, toCatalog(records));
  return { ...entry.data, meta: { source: 'network', savedAt: entry.savedAt } };
}

// Живий пошук по всьому каталогу: кожен новий запит СКАСОВУЄ попередній, щоб застаріла відповідь
// не перезаписала свіжу. Повертає null, якщо запит скасовано, — це штатна ситуація, а не помилка.
let searchController = null;

export async function searchCatalog(term) {
  searchController?.abort();
  searchController = new AbortController();
  try {
    const raw = await searchEpisodes(term, 25, { signal: searchController.signal });
    return toCatalog(raw.map((r) => ({ raw: r, fallbackSlug: OTHER.slug })));
  } catch (error) {
    if (error.name === 'AbortError') return null;
    throw error;
  }
}
