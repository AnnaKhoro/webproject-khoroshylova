// Модель випуску подкасту. Лише дані й поведінка сутності — жодних звернень до DOM.
import { daysSince, formatDuration } from '../utils/format.js';

export class Episode {
  #id;

  constructor({ id, podcastId, podcastTitle, category, categorySlug, title, description, audioUrl, durationSec, publishedAt }) {
    this.#id = id;
    this.podcastId = podcastId;
    this.podcastTitle = podcastTitle;   // назва подкасту (із таблиці podcasts)
    this.category = category;           // назва категорії (із таблиці categories)
    this.categorySlug = categorySlug;
    this.title = title;
    this.description = description;
    this.audioUrl = audioUrl;
    this.durationSec = durationSec;
    this.publishedAt = publishedAt;
  }

  // id можна прочитати, але не можна випадково перезаписати ззовні
  get id() {
    return this.#id;
  }

  get duration() {
    return formatDuration(this.durationSec);
  }

  // Чи відповідає випуск пошуковому запиту: назва, опис або назва подкасту, без урахування регістру
  matches(query) {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [this.title, this.description, this.podcastTitle]
      .some((text) => text.toLowerCase().includes(q));
  }

  // Новий випуск — опублікований не більше 30 днів тому
  isNew(today = new Date()) {
    return daysSince(this.publishedAt, today) <= 30;
  }

  // Створює екземпляр з простого об'єкта даних; podcast і category — пов'язані записи
  static fromObject(obj, { podcast, category } = {}) {
    return new Episode({
      ...obj,
      podcastTitle: podcast?.title ?? '',
      category: category?.name ?? '',
      categorySlug: category?.slug ?? '',
    });
  }
}
