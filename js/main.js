// Точка входу сторінки каталогу: зв'язує дані, сховище й розмітку і нічого не обчислює сама
import { categories, podcasts, episodes } from './data/catalog.js';
import { Store } from './services/store.js';
import { renderList, renderCategoryTags } from './ui/renderList.js';
import { formatDuration } from './utils/format.js';

const store = new Store({ episodes, podcasts, categories });

// Параметри з адреси сторінки: catalog.html?q=git або catalog.html?category=history
const params = new URLSearchParams(location.search);
const query = params.get('q') ?? '';
const category = params.get('category') ?? '';

const list = query || category
  ? store.filter({ query, category }).sort((a, b) => a.title.localeCompare(b.title, 'uk'))
  : store.sortedByTitle();

const counts = store.countByCategory();

document.querySelector('#catalog-tags').innerHTML = renderCategoryTags(store.categories, counts, category);
document.querySelector('#catalog').innerHTML = renderList(list);
document.querySelector('#catalog-summary').textContent =
  `Знайдено випусків: ${list.length} із ${store.all().length}, загальна тривалість ${formatDuration(Store.totalDuration(list))}`;
document.querySelector('#catalog-query').value = query;

console.log('countByCategory():', counts);
console.table(counts);
