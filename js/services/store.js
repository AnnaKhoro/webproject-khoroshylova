// Сховище каталогу: тримає перелік випусків і надає операції над ним.
// Жоден метод не змінює вихідний масив — назовні віддаються лише нові масиви.
import { Episode } from '../models/Episode.js';
import { FeaturedEpisode } from '../models/FeaturedEpisode.js';

export class Store {
  #items = [];

  // Приймає «сирі» таблиці, як у БД, і збирає з них екземпляри моделей
  constructor({ episodes, podcasts, categories }) {
    const podcastById = new Map(podcasts.map((p) => [p.id, p]));
    const categoryById = new Map(categories.map((c) => [c.id, c]));
    this.categories = [...categories];

    this.#items = episodes.map((obj) => {
      const podcast = podcastById.get(obj.podcastId);
      const related = { podcast, category: categoryById.get(podcast?.categoryId) };
      return obj.featured ? FeaturedEpisode.fromObject(obj, related) : Episode.fromObject(obj, related);
    });
  }

  all() {
    return [...this.#items];
  }

  // filter + matches: залишає лише випуски, що відповідають запиту
  search(query) {
    return this.#items.filter((episode) => episode.matches(query));
  }

  // filter за slug категорії; порожній slug — усі випуски
  byCategory(slug) {
    if (!slug) return this.all();
    return this.#items.filter((episode) => episode.categorySlug === slug);
  }

  // find: потрібен рівно один запис, пошук зупиняється на першому збігу
  byId(id) {
    return this.#items.find((episode) => episode.id === Number(id));
  }

  // Сортування копії за назвою з урахуванням українського алфавіту
  sortedByTitle() {
    return [...this.#items].sort((a, b) => a.title.localeCompare(b.title, 'uk'));
  }

  // Найновіші спочатку (дата у форматі РРРР-ММ-ДД порівнюється як рядок)
  sortedByDate() {
    return [...this.#items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  // reduce → об'єкт { 'Освіта': 2, 'Наука': 2, … }
  countByCategory() {
    return this.#items.reduce((acc, episode) => {
      acc[episode.category] = (acc[episode.category] ?? 0) + 1;
      return acc;
    }, {});
  }

  // Домашнє завдання: фільтр за кількома ознаками одночасно (запит + категорія + лише нові)
  filter({ query = '', category = '', onlyNew = false } = {}) {
    return this.#items
      .filter((episode) => !category || episode.categorySlug === category)
      .filter((episode) => episode.matches(query))
      .filter((episode) => !onlyNew || episode.isNew());
  }

  // Сумарна тривалість переліку в секундах
  static totalDuration(list) {
    return list.reduce((sum, episode) => sum + episode.durationSec, 0);
  }
}
