// Дані-заглушка каталогу «Хвилі». Поля відповідають таблицям з ТЗ (docs/tz.md):
// categories (id, name, slug), podcasts (id, category_id, title, author_name),
// episodes (id, podcast_id, title, description, audio_url, duration_sec, published_at).
// На ПР7 ці масиви замінить відповідь сервера.

export const categories = [
  { id: 1, name: 'Освіта', slug: 'education' },
  { id: 2, name: 'Наука', slug: 'science' },
  { id: 3, name: 'Технології', slug: 'tech' },
  { id: 4, name: 'Історія', slug: 'history' },
  { id: 5, name: 'Психологія', slug: 'psychology' },
  { id: 6, name: "Кар'єра", slug: 'career' },
];

export const podcasts = [
  { id: 1, categoryId: 1, title: 'Студентський ефір', authorName: 'Студрада коледжу' },
  { id: 2, categoryId: 3, title: 'Код без кави', authorName: 'Олег Мельник' },
  { id: 3, categoryId: 4, title: 'Місто говорить', authorName: 'Ірина Савчук' },
  { id: 4, categoryId: 2, title: 'Наука на пальцях', authorName: 'Марта Гнатюк' },
  { id: 5, categoryId: 5, title: 'Тиша між словами', authorName: 'Андрій Ковальчук' },
  { id: 6, categoryId: 6, title: 'Перша робота', authorName: 'Наталія Бондар' },
];

export const episodes = [
  { id: 1, podcastId: 1, title: 'Як отримати стипендію і не втратити її після першої сесії', description: 'Говоримо з представницею студради про рейтинг, соціальні стипендії та типові помилки першокурсників.', audioUrl: 'audio/ep-01.mp3', durationSec: 2520, publishedAt: '2026-11-03', featured: true, editorNote: 'Варто послухати кожному першокурснику перед зимовою сесією' },
  { id: 2, podcastId: 2, title: 'Нейромережі простими словами', description: 'Що відбувається всередині нейромережі, чому вона помиляється і як навчити просту модель на ноутбуці.', audioUrl: 'audio/ep-02.mp3', durationSec: 3300, publishedAt: '2026-10-28' },
  { id: 3, podcastId: 3, title: 'Рівне, якого вже немає: вулиці та будинки XIX століття', description: 'Історик розповідає, як виглядала головна вулиця міста до війни і які будинки збереглися досі.', audioUrl: 'audio/ep-03.mp3', durationSec: 2280, publishedAt: '2026-10-15' },
  { id: 4, podcastId: 4, title: 'Чому небо синє, а захід сонця червоний', description: 'Розсіювання світла в атмосфері без формул: досліди, які можна повторити вдома з ліхтариком.', audioUrl: 'audio/ep-04.mp3', durationSec: 1860, publishedAt: '2026-09-22' },
  { id: 5, podcastId: 2, title: 'Git для тих, хто боїться терміналу', description: 'Коміти, гілки й злиття на прикладі навчального проєкту: що робити, коли все пішло не так.', audioUrl: 'audio/ep-05.mp3', durationSec: 2940, publishedAt: '2026-11-07', featured: true, editorNote: 'Найкраще пояснення гілок і злиття для початківців' },
  { id: 6, podcastId: 5, title: 'Прокрастинація: лінь чи страх помилки', description: 'Психологиня пояснює, чому ми відкладаємо важливе і як розбивати великі завдання на кроки.', audioUrl: 'audio/ep-06.mp3', durationSec: 2100, publishedAt: '2026-10-30' },
  { id: 7, podcastId: 6, title: 'Резюме без досвіду роботи: що писати', description: 'Як описати навчальні проєкти, практику й волонтерство так, щоб рекрутер дочитав до кінця.', audioUrl: 'audio/ep-07.mp3', durationSec: 2460, publishedAt: '2026-08-30' },
  { id: 8, podcastId: 1, title: 'Гуртожиток: правила, сусіди й побут', description: 'Студенти розповідають про поселення, спільну кухню та те, як домовлятися із сусідами по кімнаті.', audioUrl: 'audio/ep-08.mp3', durationSec: 1980, publishedAt: '2026-09-05' },
  { id: 9, podcastId: 4, title: 'Як працюють вакцини', description: 'Імунна пам\'ять, антитіла й клінічні випробування: розбираємося, що відбувається після щеплення.', audioUrl: 'audio/ep-09.mp3', durationSec: 2700, publishedAt: '2026-10-20' },
  { id: 10, podcastId: 3, title: 'Острозька академія: перша вища школа на Волині', description: 'Хто заснував академію, чого там навчали і чому про неї досі говорять історики.', audioUrl: 'audio/ep-10.mp3', durationSec: 3060, publishedAt: '2026-07-12' },
];
