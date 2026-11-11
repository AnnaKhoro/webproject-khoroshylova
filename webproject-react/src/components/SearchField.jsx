// Кероване поле пошуку: значення приходить згори (value), а про намір змінити його
// компонент лише повідомляє батькові через onChange. Власних даних не має.
export function SearchField({ value, onChange, label = 'Пошук випусків', placeholder = 'Назва, тема або подкаст' }) {
  return (
    <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
      <label className="visually-hidden" htmlFor="catalog-query">{label}</label>
      <input
        className="search__input"
        id="catalog-query"
        type="search"
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </form>
  );
}
