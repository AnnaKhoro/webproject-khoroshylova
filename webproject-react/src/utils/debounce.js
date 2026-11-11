// Затримка виклику: функція виконується лише після паузи delay мс від ОСТАННЬОГО виклику.
// Під час швидкого набору всі проміжні виклики скасовуються, спрацьовує тільки останній.
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
