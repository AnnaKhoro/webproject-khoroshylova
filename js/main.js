// Точка входу сторінки каталогу: зберігає стан інтерфейсу, обробляє події й перемальовує перелік
import { categories, podcasts, episodes } from './data/catalog.js';
import { Store } from './services/store.js';
import { renderList, renderCategoryTags } from './ui/renderList.js';
import { formatDuration } from './utils/format.js';

const store = new Store({ episodes, podcasts, categories });
const counts = store.countByCategory();

const els = {
  search: document.querySelector('#catalog-search'),
  query: document.querySelector('#catalog-query'),
  sort: document.querySelector('#catalog-sort'),
  tags: document.querySelector('#catalog-tags'),
  list: document.querySelector('#catalog'),
  summary: document.querySelector('#catalog-summary'),
};

// Увесь стан інтерфейсу — в одному об'єкті; змінюється лише заміною на новий об'єкт
let state = { query: '', category: null, sort: 'title' };

function setState(patch) {
  state = { ...state, ...patch };
  update();
}

function visibleEpisodes() {
  const list = store
    .search(state.query)
    .filter((episode) => !state.category || episode.categorySlug === state.category);
  return state.sort === 'date'
    ? list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    : list.sort((a, b) => a.title.localeCompare(b.title, 'uk'));
}

// Одна функція перемальовування для будь-якої зміни стану
function update() {
  const list = visibleEpisodes();
  els.list.innerHTML = renderList(list);
  els.tags.innerHTML = renderCategoryTags(store.categories, counts, state.category);
  els.summary.textContent =
    `Знайдено випусків: ${list.length} із ${store.all().length}, загальна тривалість ${formatDuration(Store.totalDuration(list))}`;
}

// Живий пошук: кожна зміна поля одразу оновлює перелік; Enter не перезавантажує сторінку
els.query.addEventListener('input', (event) => setState({ query: event.target.value }));
els.search.addEventListener('submit', (event) => event.preventDefault());

// Категорії: один обробник на контейнері міток
els.tags.addEventListener('click', (event) => {
  const tag = event.target.closest('[data-category]');
  if (!tag) return;
  setState({ category: tag.dataset.category || null });
  // після перемальовування міток повертаємо фокус на вибрану, щоб не загубити його при роботі з клавіатури
  els.tags.querySelector(`[data-category="${tag.dataset.category}"]`).focus();
});

els.sort.addEventListener('change', (event) => setState({ sort: event.target.value }));

update();
console.log('countByCategory():', counts);
