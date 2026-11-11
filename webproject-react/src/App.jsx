// Кореневий компонент застосунку «Хвиля»: сторінка каталогу, зібрана з компонентів.
// Дані поки що з перенесеної заглушки через сховище Store; на ПР12 їх замінить API.
import { categories, podcasts, episodes } from './data/catalog.js';
import { Store } from './services/store.js';
import { formatDuration } from './utils/format.js';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { EpisodeList } from './components/EpisodeList.jsx';
import { Tag } from './components/Tag.jsx';

const store = new Store({ episodes, podcasts, categories });

export default function App() {
  const list = store.sortedByTitle();
  const counts = store.countByCategory();

  // Поки що лише виводимо запис у консоль; модальне вікно з'явиться разом зі станом на ПР10
  function handleOpen(id) {
    console.log('Відкрити випуск:', store.byId(id));
  }

  return (
    <>
      <Header active="Каталог" />
      <main className="container catalog">
        <h1>Каталог випусків</h1>
        <div className="catalog__filters">
          <div className="tags">
            <Tag active>Усі ({list.length})</Tag>
            {store.categories.map((c) => (
              <Tag key={c.slug}>{c.name} ({counts[c.name] ?? 0})</Tag>
            ))}
          </div>
        </div>
        <p className="catalog__summary">
          Випусків у каталозі: {list.length}, загальна тривалість {formatDuration(Store.totalDuration(list))}
        </p>
        <EpisodeList episodes={list} onOpen={handleOpen} />
      </main>
      <Footer />
    </>
  );
}
