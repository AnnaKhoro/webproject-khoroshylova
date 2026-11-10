// Відкриття й закриття модального вікна (модифікатор modal--open з UI-кіту).
// Закрити можна трьома способами: кнопкою ×, кліком по підкладці, клавішею Escape.
let current = null;      // відкрите вікно
let opener = null;       // елемент, з якого вікно відкрили

function onKeydown(event) {
  if (event.key === 'Escape') closeModal();
}

export function openModal(modal, fromElement) {
  current = modal;
  opener = fromElement;
  modal.classList.add('modal--open');
  modal.querySelector('.modal__close').focus();
  document.addEventListener('keydown', onKeydown);
}

export function closeModal() {
  if (!current) return;
  current.classList.remove('modal--open');
  document.removeEventListener('keydown', onKeydown);
  current = null;
  opener?.focus();   // фокус повертається на кнопку, яка відкрила вікно
}

// Один обробник на вікні: і кнопка ×, і підкладка, і «Закрити» мають атрибут data-modal-close
export function bindModal(modal) {
  modal.addEventListener('click', (event) => {
    if (event.target.closest('[data-modal-close]')) closeModal();
  });
}
