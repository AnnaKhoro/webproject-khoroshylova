// Перевірка сховища без браузера: models/, services/, utils/ і data/ не звертаються до DOM,
// тому ці модулі однаково працюють і в браузері, і в Node.js (а згодом — і в React).
import { categories, podcasts, episodes } from '../js/data/catalog.js';
import { Store } from '../js/services/store.js';

const store = new Store({ episodes, podcasts, categories });
const before = store.all().map((e) => e.id).join(',');

console.log('search("нейромереж"):', store.search('нейромереж').map((e) => e.title));
console.log('byCategory("history"):', store.byCategory('history').map((e) => e.title));
console.log('byId(5):', store.byId(5).title);
console.log('sortedByTitle():', store.sortedByTitle().map((e) => e.id).join(','));
console.log('порядок після сортування не змінився:', store.all().map((e) => e.id).join(',') === before);
console.log('countByCategory():', store.countByCategory());
