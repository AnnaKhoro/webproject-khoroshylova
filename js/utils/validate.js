// Правила перевірки форми «Запропонувати подкаст». Лише логіка — без звернень до DOM,
// тож ті самі правила можна буде перенести на сервер (ПР13).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Повертає об'єкт помилок: ключ — name поля, значення — зрозумілий текст українською
export function validateSuggestion(data, { existingTitles = [] } = {}) {
  const errors = {};
  const name = (data.name ?? '').trim();
  const email = (data.email ?? '').trim();
  const title = (data.podcastTitle ?? '').trim();
  const link = (data.link ?? '').trim();
  const message = (data.message ?? '').trim();

  // 1. Обов'язковість і мінімальна довжина
  if (!name) errors.name = "Вкажіть, як до вас звертатися";
  else if (name.length < 2) errors.name = "Ім'я закоротке — мінімум 2 символи";

  // 2. Формат адреси пошти
  if (!email) errors.email = 'Вкажіть email, щоб ми могли відповісти';
  else if (!EMAIL.test(email)) errors.email = 'Email має бути у форматі name@example.com';

  // 3. Правило проєкту: такого подкасту ще немає в каталозі (без урахування регістру)
  if (!title) errors.podcastTitle = 'Вкажіть назву подкасту';
  else if (title.length < 3) errors.podcastTitle = 'Назва закоротка — мінімум 3 символи';
  else if (existingTitles.some((t) => t.toLowerCase() === title.toLowerCase())) {
    errors.podcastTitle = `Подкаст «${title}» уже є в каталозі — знайдіть його через пошук`;
  }

  if (!data.category) errors.category = 'Виберіть категорію зі списку';

  // 4. Правило проєкту: посилання на сторінку подкасту — лише захищене https://
  if (!link) errors.link = 'Додайте посилання, де можна послухати подкаст';
  else if (!isHttpsUrl(link)) errors.link = 'Посилання має починатися з https:// (наприклад, https://youtube.com/@podcast)';

  const missing = 20 - message.length;
  if (missing > 0) errors.message = `Опишіть подкаст детальніше: потрібно ще ${missing} симв. (мінімум 20)`;

  return errors;
}

function isHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.includes('.');
  } catch {
    return false;
  }
}
