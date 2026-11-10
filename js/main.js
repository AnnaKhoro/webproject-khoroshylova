// Точка входу сторінки каталогу: зберігає стан інтерфейсу, обробляє події й перемальовує перелік
import { categories, podcasts, episodes } from './data/catalog.js';
import { Store } from './services/store.js';
import { renderList, renderCategoryTags } from './ui/renderList.js';
import { renderSkeleton, renderError } from './ui/renderStatus.js';
import { renderDetails } from './ui/renderDetails.js';
import { openModal, bindModal } from './ui/modal.js';
import { showErrors, clearFieldError } from './ui/formErrors.js';
import { validateSuggestion } from './utils/validate.js';
import { formatDuration, escapeHtml } from './utils/format.js';

// Сховище з'являється лише після завантаження даних
let store = null;
let counts = {};
let existingTitles = [];

// Джерело даних: поки що заглушка, але вже асинхронно — як буде з мережею
async function loadCatalog() {
  return { episodes, podcasts, categories };
}

const els = {
  search: document.querySelector('#catalog-search'),
  query: document.querySelector('#catalog-query'),
  sort: document.querySelector('#catalog-sort'),
  tags: document.querySelector('#catalog-tags'),
  list: document.querySelector('#catalog'),
  summary: document.querySelector('#catalog-summary'),
  modal: document.querySelector('#episode-modal'),
  modalContent: document.querySelector('#episode-modal-content'),
  form: document.querySelector('#suggest-form'),
  result: document.querySelector('#suggest-result'),
};

// Увесь стан інтерфейсу — в одному об'єкті; змінюється лише заміною на новий об'єкт
// status: 'idle' → 'loading' → 'success' | 'error'
let state = { status: 'idle', error: null, query: '', category: null, sort: 'title', favorites: [] };

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
  if (state.status === 'loading') {
    els.list.innerHTML = renderSkeleton();
    els.tags.innerHTML = '';
    els.summary.textContent = 'Завантаження каталогу…';
    return;
  }
  if (state.status === 'error') {
    els.list.innerHTML = renderError(state.error);
    els.tags.innerHTML = '';
    els.summary.textContent = '';
    return;
  }
  const list = visibleEpisodes();
  els.list.innerHTML = renderList(list, state.favorites);
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

// Делегування: ОДИН обробник на контейнері каталогу обслуговує кнопки всіх карток,
// зокрема тих, що з'являться після перемальовування переліку
els.list.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;                       // клік повз кнопки — нічого не робимо
  const { action, id } = button.dataset;
  if (action === 'open') openDetails(Number(id), button);
  if (action === 'favorite') toggleFavorite(Number(id));
  if (action === 'retry') load();
});

function toggleFavorite(id) {
  const favorites = state.favorites.includes(id)
    ? state.favorites.filter((favId) => favId !== id)
    : [...state.favorites, id];
  setState({ favorites });
  els.list.querySelector(`[data-action="favorite"][data-id="${id}"]`)?.focus();
}

bindModal(els.modal);

function openDetails(id, button) {
  const episode = store.byId(id);
  if (!episode) return;
  els.modalContent.innerHTML = renderDetails(episode);
  openModal(els.modal, button);
}

// Форма «Запропонувати подкаст» (перелік наявних назв береться із завантажених даних)

els.form.addEventListener('submit', (event) => {
  event.preventDefault();                                  // без перезавантаження сторінки
  const data = Object.fromEntries(new FormData(els.form)); // значення за атрибутами name
  const errors = validateSuggestion(data, { existingTitles });
  showErrors(els.form, errors);                            // введені дані не чіпаємо

  if (Object.keys(errors).length > 0) {
    els.result.innerHTML = '';
    return;
  }
  els.result.innerHTML = `
    <div class="alert alert--success" role="status" tabindex="-1">
      <span class="alert__icon" aria-hidden="true">✓</span>
      <span class="alert__text"><b>Дякуємо!</b> Пропозицію подкасту «${escapeHtml(data.podcastTitle.trim())}» надіслано, ми відповімо на ${escapeHtml(data.email.trim())}.</span>
    </div>`;
  console.log('Пропозиція подкасту:', data);
  els.form.reset();
  els.result.querySelector('.alert').focus();
});

// Позначка помилки зникає, щойно користувач почав виправляти поле
els.form.addEventListener('input', (event) => clearFieldError(event.target));
els.form.addEventListener('change', (event) => clearFieldError(event.target));

// Завантаження даних з трьома станами інтерфейсу
async function load() {
  setState({ status: 'loading', error: null });
  try {
    const catalog = await loadCatalog();
    store = new Store(catalog);
    counts = store.countByCategory();
    existingTitles = catalog.podcasts.map((p) => p.title);
    setState({ status: 'success' });
    console.log('countByCategory():', counts);
  } catch (error) {
    console.error('Помилка завантаження каталогу:', error);
    setState({ status: 'error', error });
  }
}

load();
