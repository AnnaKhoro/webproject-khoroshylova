// Перевірка модуля доступу до API і перетворювача без браузера: services/ не звертається до DOM,
// тому працює й у Node.js (fetch вбудований у Node 18+).
import { searchEpisodes, toEpisode, getCatalog } from '../js/services/api.js';
import { Store } from '../js/services/store.js';

// 1. Один сирий запис API і результат перетворення
const [raw] = await searchEpisodes('історія', 1);
console.log('Запис API (скорочено):', {
  trackId: raw.trackId, trackName: raw.trackName, collectionId: raw.collectionId,
  collectionName: raw.collectionName, trackTimeMillis: raw.trackTimeMillis,
  releaseDate: raw.releaseDate, genres: raw.genres,
});
const short = (e) => ({ ...e, description: e.description.slice(0, 60) + '…', audioUrl: e.audioUrl.slice(0, 40) + '…' });
console.log('Після перетворювача:', short(toEpisode(raw)));

// 2. Неповний запис: видаляємо кілька полів — перетворювач не падає, підставляє значення за замовчуванням
const partial = { ...raw };
for (const key of ['collectionName', 'description', 'shortDescription', 'trackTimeMillis', 'genres', 'releaseDate']) delete partial[key];
console.log('Неповний запис після перетворювача:', short(toEpisode(partial, 'history')));

// 3. Увесь каталог через Promise.all і Store з ПР5 без змін
console.time('getCatalog (6 запитів паралельно)');
const catalog = await getCatalog();
console.timeEnd('getCatalog (6 запитів паралельно)');
const store = new Store(catalog);
console.log(`Випусків: ${store.all().length}, подкастів: ${catalog.podcasts.length}`);
console.log('countByCategory():', store.countByCategory());
