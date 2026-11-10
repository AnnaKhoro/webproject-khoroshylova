// Точка входу сторінки каталогу: зв'язує дані, моделі, сховище й розмітку
import { categories, podcasts, episodes } from './data/catalog.js';
import { Store } from './services/store.js';

const store = new Store({ episodes, podcasts, categories });

console.log('Усього випусків:', store.all().length);
console.log('search("нейромереж"):', store.search('нейромереж').map((e) => e.title));
console.log('byCategory("history"):', store.byCategory('history').map((e) => e.title));
console.log('byId(5):', store.byId(5)?.title);
console.log('sortedByTitle():', store.sortedByTitle().map((e) => e.title));
console.log('Вихідний порядок не змінився:', store.all().map((e) => e.id).join(','));
console.log('countByCategory():', store.countByCategory());
