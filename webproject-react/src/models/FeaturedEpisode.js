// Випуск, обраний редакцією: має коментар редактора, який теж бере участь у пошуку
import { Episode } from './Episode.js';

export class FeaturedEpisode extends Episode {
  constructor(data) {
    super(data);
    this.editorNote = data.editorNote ?? '';
  }

  get isFeatured() {
    return true;
  }

  // Перевизначення: шукаємо так само, як звичайний випуск, і додатково в коментарі редактора
  matches(query) {
    return super.matches(query) || this.editorNote.toLowerCase().includes(query.trim().toLowerCase());
  }

  static fromObject(obj, related = {}) {
    const base = Episode.fromObject(obj, related);
    return new FeaturedEpisode({ ...obj, podcastTitle: base.podcastTitle, category: base.category, categorySlug: base.categorySlug });
  }
}
