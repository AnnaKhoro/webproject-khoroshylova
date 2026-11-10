// Відкриття й закриття модальних вікон UI-кіту (модифікатор modal--open)
document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-modal-open]');
  if (opener) {
    const modal = document.getElementById(opener.dataset.modalOpen);
    modal.classList.add('modal--open');
    modal.querySelector('.modal__close').focus();
    modal.opener = opener;
    return;
  }
  if (event.target.closest('[data-modal-close]')) {
    closeModal(event.target.closest('.modal'));
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.modal--open'));
  }
});

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('modal--open');
  if (modal.opener) modal.opener.focus();  // повертаємо фокус на кнопку, що відкрила вікно
}
