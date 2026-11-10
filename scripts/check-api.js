// Перевірка модуля доступу до API без браузера: services/api.js не звертається до DOM,
// тому працює й у Node.js (fetch вбудований у Node 18+).
import { searchEpisodes } from '../js/services/api.js';

const raw = await searchEpisodes('історія', 3);
console.log(`Отримано записів: ${raw.length}`);
console.log('Поля одного запису API:', Object.keys(raw[0]).join(', '));
console.log('Приклад запису (скорочено):', {
  trackId: raw[0].trackId,
  trackName: raw[0].trackName,
  collectionName: raw[0].collectionName,
  trackTimeMillis: raw[0].trackTimeMillis,
  releaseDate: raw[0].releaseDate,
  genres: raw[0].genres,
});
