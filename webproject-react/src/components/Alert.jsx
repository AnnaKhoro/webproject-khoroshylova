// Повідомлення з UI-кіту: variant = 'info' | 'success' | 'warning' | 'error'.
// Тип видно не лише з кольору, а й зі значка та заголовка title.
const ICONS = { info: 'ℹ', success: '✓', warning: '!', error: '✕' };

export function Alert({ variant = 'info', title, children }) {
  const className = variant === 'info' ? 'alert' : `alert alert--${variant}`;
  return (
    <div className={className} role={variant === 'error' ? 'alert' : 'status'}>
      <span className="alert__icon" aria-hidden="true">{ICONS[variant]}</span>
      <span className="alert__text">
        {title && <b>{title}</b>} {children}
      </span>
    </div>
  );
}
