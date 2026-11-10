// Показ і приховування помилок форми через модифікатор field--invalid з UI-кіту.
// Стилі тут не змінюються — лише клас, текст у field__error та aria-invalid.
export function showErrors(form, errors) {
  form.querySelectorAll('.field').forEach((field) => {
    const input = field.querySelector('[name]');
    const message = errors[input.name];
    field.classList.toggle('field--invalid', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    field.querySelector('.field__error').textContent = message ?? '';
  });
  // фокус — на перше поле з помилкою, щоб одразу почати виправлення
  form.querySelector('.field--invalid [name]')?.focus();
}

export function clearFieldError(input) {
  const field = input.closest('.field--invalid');
  if (!field) return;
  field.classList.remove('field--invalid');
  input.setAttribute('aria-invalid', 'false');
}
