// Перелік випусків: кожен запис — компонент Card. key — стабільний id випуску, а не індекс масиву.
// Порожній перелік — окремий стан з повідомленням (Alert), як на ПР8.
import { Card } from './Card.jsx';
import { Alert } from './Alert.jsx';

export function EpisodeList({ episodes, onOpen }) {
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
