// Поле форми з UI-кіту: label пов'язаний з полем через htmlFor/id, помилка — модифікатор field--invalid
// і текст у field__error. as = 'input' | 'textarea' | 'select' (для select варіанти передаються як children).
export function Field({ label, name, id = name, as = 'input', type = 'text', value, error, hint, disabled = false, onChange, children, ...rest }) {
  const Control = as;
  const className = ['field', error && 'field--invalid', disabled && 'field--disabled'].filter(Boolean).join(' ');
  const inputClass = as === 'textarea' ? 'field__input field__input--textarea' : 'field__input';
  return (
    <div className={className}>
      <label className="field__label" htmlFor={id}>{label}</label>
      <Control
        className={inputClass}
        id={id}
        name={name}
        type={as === 'input' ? type : undefined}
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      >
        {children}
      </Control>
      {hint && !error && <span className="field__hint">{hint}</span>}
      <span className="field__error" id={`${id}-error`}>{error}</span>
    </div>
  );
}
