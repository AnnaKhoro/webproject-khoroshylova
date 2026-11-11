// Мітка категорії з UI-кіту: поточна позначена модифікатором tag--active і aria-pressed
export function Tag({ active = false, onClick, children }) {
  return (
    <button className={active ? 'tag tag--active' : 'tag'} type="button" aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  );
}
