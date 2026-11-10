// Точка входу сторінки каталогу: зв'язує дані, моделі, сховище й розмітку
import { categories, podcasts, episodes } from './data/catalog.js';
import { formatDuration } from './utils/format.js';

console.log(`Дані завантажено: ${categories.length} категорій, ${podcasts.length} подкастів, ${episodes.length} випусків`);
console.log('Тривалість першого випуску:', formatDuration(episodes[0].durationSec));
