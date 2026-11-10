// Точка входу сторінки каталогу: зв'язує дані, моделі, сховище й розмітку
import { categories, podcasts, episodes } from './data/catalog.js';
import { Episode } from './models/Episode.js';
import { FeaturedEpisode } from './models/FeaturedEpisode.js';

const podcast = podcasts.find((p) => p.id === episodes[0].podcastId);
const category = categories.find((c) => c.id === podcast.categoryId);

const first = Episode.fromObject(episodes[1], { podcast: podcasts[1], category: categories[2] });
const featured = FeaturedEpisode.fromObject(episodes[0], { podcast, category });

console.log(first.id, first.title, first.duration, 'новий:', first.isNew());
console.log('Приватне поле недоступне ззовні:', Object.keys(first).includes('id') ? 'ні' : 'так');
console.log('matches("сесії") для звичайного:', first.matches('сесії'));
console.log('matches("першокурснику") для обраного (пошук у коментарі редактора):', featured.matches('першокурснику'));
console.log('featured instanceof Episode:', featured instanceof Episode);
