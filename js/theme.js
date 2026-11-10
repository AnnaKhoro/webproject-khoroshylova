// Перемикання світлої й темної теми через атрибут data-theme на <html>; вибір зберігається
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved) root.dataset.theme = saved;

document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
  const update = () => {
    button.textContent = root.dataset.theme === 'dark' ? 'Світла тема' : 'Темна тема';
  };
  update();
  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
    update();
  });
});
