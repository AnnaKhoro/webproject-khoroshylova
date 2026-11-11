// Кореневий компонент застосунку «Хвиля».
// Перевірка перенесення: модулі з ПР5–ПР8 імпортуються в React без змін.
import { categories, podcasts, episodes } from './data/catalog.js';
import { Store } from './services/store.js';
import { formatDuration } from './utils/format.js';

const store = new Store({ episodes, podcasts, categories });

export default function App() {
  const all = store.all();
  return (
    <main className="container">
      <h1>Хвиля</h1>
      <p>
        Модулі перенесено: у сховищі {all.length} випусків загальною тривалістю{' '}
        {formatDuration(Store.totalDuration(all))}.
      </p>
    </main>
  );
}
