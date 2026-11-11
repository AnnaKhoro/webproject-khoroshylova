// Форма «Запропонувати подкаст» з керованими полями. Стан усіх полів — один об'єкт у самій формі,
// бо більше нікому не потрібен. Правила перевірки — модуль utils/validate.js з ПР6 без змін.
import { useState } from 'react';
import { validateSuggestion } from '../utils/validate.js';
import { Field } from './Field.jsx';
import { Button } from './Button.jsx';
import { Alert } from './Alert.jsx';

const EMPTY = { name: '', email: '', podcastTitle: '', category: '', link: '', message: '' };

const CATEGORIES = [
  ['education', 'Освіта'], ['science', 'Наука'], ['tech', 'Технології'],
  ['history', 'Історія'], ['psychology', 'Психологія'], ['career', "Кар'єра"],
];

export function SuggestForm({ existingTitles }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);   // дані останньої успішної пропозиції

  // Функційна форма setForm: нове значення будується з попереднього стану, а не з копії в замиканні
  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));   // помилка зникає під час редагування
  };

  function handleSubmit(event) {
    event.preventDefault();
    const found = validateSuggestion(form, { existingTitles });
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      setSent(null);
      document.getElementById(`suggest-${first}`)?.focus();   // фокус — на перше поле з помилкою
      return;
    }
    console.log('Пропозиція подкасту:', form);
    setSent(form);
    setForm(EMPTY);
  }

  const field = (name) => ({
    name,
    id: `suggest-${name}`,
    value: form[name],
    error: errors[name],
    onChange: handleChange(name),
  });

  return (
    <section className="catalog__suggest" aria-labelledby="suggest-heading">
      <h2 id="suggest-heading">Запропонувати подкаст</h2>
      <p className="catalog__intro">
        Знаєте україномовний подкаст, якого ще немає в каталозі? Розкажіть про нього — після перевірки редакція додасть
        його разом із розшифровками випусків.
      </p>
      {sent && (
        <div className="catalog__result">
          <Alert variant="success" title="Дякуємо!">
            Пропозицію подкасту «{sent.podcastTitle.trim()}» надіслано, ми відповімо на {sent.email.trim()}.
          </Alert>
        </div>
      )}
      <form className="catalog__form" noValidate onSubmit={handleSubmit}>
        <Field label="Ваше ім'я" autoComplete="name" {...field('name')} />
        <Field label="Email" type="email" autoComplete="email" {...field('email')} />
        <Field label="Назва подкасту" {...field('podcastTitle')} />
        <Field label="Категорія" as="select" {...field('category')}>
          <option value="">— виберіть —</option>
          {CATEGORIES.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}
        </Field>
        <div className="catalog__wide">
          <Field label="Посилання на подкаст" type="url" placeholder="https://" {...field('link')} />
        </div>
        <div className="catalog__wide">
          <Field label="Чим цікавий подкаст" as="textarea" rows={4} {...field('message')} />
        </div>
        <div className="catalog__wide">
          <Button type="submit">Надіслати пропозицію</Button>
        </div>
      </form>
    </section>
  );
}
