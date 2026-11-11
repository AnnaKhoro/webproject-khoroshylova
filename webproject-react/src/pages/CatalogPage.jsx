// Сторінка каталогу: тут живе стан, потрібний і полю пошуку, і фільтру, і переліку —
// їхній найближчий спільний предок. Дочірні компоненти отримують значення й функції зміни.
import { useState } from 'react';
import { categories, podcasts, episodes } from '../data/catalog.js';
import { Store } from '../services/store.js';
import { formatDuration } from '../utils/format.js';
import { SearchField } from '../components/SearchField.jsx';
import { CategoryFilter } from '../components/CategoryFilter.jsx';
import { Field } from '../components/Field.jsx';
import { EpisodeList } from '../components/EpisodeList.jsx';

const store = new Store({ episodes, podcasts, categories });
const counts = store.countByCategory();

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);   // slug або null — «Усі»
  const [sort, setSort] = useState('title');         // 'title' | 'date'

  // Похідні дані: обчислюються під час кожного рендерингу, а не зберігаються в стані
  const filtered = store
    .search(query)
    .filter((episode) => !category || episode.categorySlug === category)
    .sort((a, b) => (sort === 'date'
      ? b.publishedAt.localeCompare(a.publishedAt)
      : a.title.localeCompare(b.title, 'uk')));

  function handleOpen(id) {
    console.log('Відкрити випуск:', store.byId(id));
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
      <p className="catalog__summary" role="status">
        Знайдено випусків: {filtered.length} із {store.all().length}, загальна тривалість {formatDuration(Store.totalDuration(filtered))}
      </p>
      <EpisodeList episodes={filtered} onOpen={handleOpen} />
    </main>
  );
}
