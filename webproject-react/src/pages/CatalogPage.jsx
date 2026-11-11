// Сторінка каталогу: тут живе стан, потрібний і полю пошуку, і фільтру, і переліку —
// їхній найближчий спільний предок. Дочірні компоненти отримують значення й функції зміни.
import { useState, useRef } from 'react';
import { categories, podcasts, episodes } from '../data/catalog.js';
import { Store } from '../services/store.js';
import { formatDuration } from '../utils/format.js';
import { SearchField } from '../components/SearchField.jsx';
import { CategoryFilter } from '../components/CategoryFilter.jsx';
import { Field } from '../components/Field.jsx';
import { EpisodeList } from '../components/EpisodeList.jsx';
import { Modal } from '../components/Modal.jsx';

const store = new Store({ episodes, podcasts, categories });
const counts = store.countByCategory();

// Тимчасовий ручний перемикач стану для перевірки: ?status=loading | error
// (так само його можна змінити в React Developer Tools). Справжнє завантаження — на ПР12.
function initialStatus() {
  const value = new URLSearchParams(window.location.search).get('status');
  return ['loading', 'error', 'success'].includes(value) ? value : 'success';
}

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);   // slug або null — «Усі»
  const [sort, setSort] = useState('title');         // 'title' | 'date'
  const [status, setStatus] = useState(initialStatus);   // 'loading' | 'success' | 'error'
  const [openEpisode, setOpenEpisode] = useState(null);  // відкритий запис: null або Episode
  const openerRef = useRef(null);                          // кнопка, з якої відкрили вікно
  const error = status === 'error' ? Object.assign(new Error('HTTP 503'), { status: 503 }) : null;

  // Похідні дані: обчислюються під час кожного рендерингу, а не зберігаються в стані
  const filtered = store
    .search(query)
    .filter((episode) => !category || episode.categorySlug === category)
    .sort((a, b) => (sort === 'date'
      ? b.publishedAt.localeCompare(a.publishedAt)
      : a.title.localeCompare(b.title, 'uk')));

  function handleOpen(id) {
    openerRef.current = document.activeElement;   // запам'ятовуємо кнопку «Детальніше»
    setOpenEpisode(store.byId(id));
  }

  function handleClose() {
    setOpenEpisode(null);
    openerRef.current?.focus();                   // фокус повертається туди, звідки відкрили вікно
  }

  return (
    <main className="container catalog">
      <h1>Каталог випусків</h1>
      <div className="catalog__filters">
        <div className="catalog__controls">
          <SearchField value={query} onChange={setQuery} />
          <div className="catalog__actions">
            <Field label="Сортування" name="sort" as="select" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="title">За назвою (А–Я)</option>
              <option value="date">Спочатку нові</option>
            </Field>
          </div>
        </div>
        <CategoryFilter categories={store.categories} counts={counts} value={category} onChange={setCategory} />
      </div>
      {status === 'success' && (
        <p className="catalog__summary" role="status">
          Знайдено випусків: {filtered.length} із {store.all().length}, загальна тривалість {formatDuration(Store.totalDuration(filtered))}
        </p>
      )}
      <EpisodeList status={status} error={error} episodes={filtered} onOpen={handleOpen} onRetry={() => setStatus('success')} />
      {openEpisode && <Modal episode={openEpisode} onClose={handleClose} />}
    </main>
  );
}
