// Модальне вікно з даними випуску. Виводиться умовно — лише коли сторінка передала episode.
// Закривається трьома способами: кнопкою × (і «Закрити»), кліком по підкладці, клавішею Escape.
import { Button } from './Button.jsx';
import { Alert } from './Alert.jsx';
import { formatDate } from '../utils/format.js';

export function Modal({ episode, onClose }) {
  // Escape: фокус під час відкриття стоїть на кнопці × усередині вікна, тож подія доходить сюди
  function handleKeyDown(event) {
    if (event.key === 'Escape') onClose();
  }

  return (
    <div className="modal modal--open" role="dialog" aria-modal="true" aria-labelledby="episode-modal-title" onKeyDown={handleKeyDown}>
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__window">
        <button className="modal__close" type="button" aria-label="Закрити" onClick={onClose} autoFocus>×</button>
        <h3 className="modal__title" id="episode-modal-title">{episode.title}</h3>
        <p className="card__subtitle">{episode.podcastTitle} · {episode.category}</p>
        <p className="modal__text">{episode.description}</p>
        <p className="card__text">
          Тривалість: {episode.duration} · опубліковано {formatDate(episode.publishedAt)}
          {episode.isNew() && ' · новий випуск'}
        </p>
        {episode.isFeatured && <Alert variant="success" title="Вибір редакції.">{episode.editorNote}</Alert>}
        <div className="modal__actions">
          <Button variant="ghost" onClick={onClose}>Закрити</Button>
        </div>
      </div>
    </div>
  );
}
