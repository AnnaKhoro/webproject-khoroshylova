// Кнопка з UI-кіту (ПР4): модифікатори БЕМ button--primary/--secondary/--ghost стали властивістю variant,
// button--small — властивістю size. Класи в стилях не змінювалися.
export function Button({ variant = 'primary', size, type = 'button', disabled = false, onClick, children, ...rest }) {
  const className = ['button', `button--${variant}`, size && `button--${size}`].filter(Boolean).join(' ');
  return (
    <button className={className} type={type} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
