// Перелік випусків з умовним рендерингом: ранні повернення для кожного стану.
// key — стабільний id випуску, а не індекс масиву.
import { Card } from './Card.jsx';
import { Alert } from './Alert.jsx';
import { Button } from './Button.jsx';
import { describeError } from '../utils/errors.js';

// Скелет картки на час завантаження (модифікатор card--skeleton з ПР7)
function CardSkeleton() {
  return (
    <div className="card card--skeleton" aria-hidden="true">
      <div className="card__image" />
      <div className="card__line" />
      <div className="card__line card__line--short" />
      <div className="card__line" />
    </div>
  );
}

export function EpisodeList({ status = 'success', error = null, episodes, onOpen, onRetry }) {
  if (status === 'loading') {
    return (
      <div className="cards" aria-busy="true">
        <span className="visually-hidden" role="status">Завантаження каталогу…</span>
        {[1, 2, 3, 4, 5, 6].map((n) => <CardSkeleton key={n} />)}
      </div>
    );
  }

  if (status === 'error') {
    const { title, advice } = describeError(error, { online: navigator.onLine });
    return (
      <Alert variant="error" title={title}>
        {advice}
        {onRetry && (
          <>
            <br />
            <Button variant="secondary" size="small" onClick={onRetry}>Спробувати ще раз</Button>
          </>
        )}
      </Alert>
    );
  }

  if (episodes.length === 0) {
    return <Alert title="Нічого не знайдено.">Спробуйте інше слово або виберіть іншу категорію.</Alert>;
  }

  return (
    <div className="cards">
      {episodes.map((episode) => (
        <Card key={episode.id} episode={episode} onOpen={onOpen} />
      ))}
    </div>
  );
}
