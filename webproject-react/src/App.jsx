// Кореневий компонент застосунку «Хвиля».
// Тимчасова вітрина: перевірка базових компонентів UI-кіту в React.
import { categories, podcasts, episodes } from './data/catalog.js';
import { Store } from './services/store.js';
import { Button } from './components/Button.jsx';
import { Card } from './components/Card.jsx';
import { Field } from './components/Field.jsx';
import { Alert } from './components/Alert.jsx';
import { Tag } from './components/Tag.jsx';

const store = new Store({ episodes, podcasts, categories });

export default function App() {
  const [first, second] = [store.byId(1), store.byId(2)];
  return (
    <main className="container kit">
      <h1>Компоненти UI-кіту в React</h1>
      <div className="kit__row">
        <Button>Слухати</Button>
        <Button variant="secondary">У вибране</Button>
        <Button variant="ghost">Скасувати</Button>
        <Button disabled>Недоступно</Button>
        <Button size="small">Увійти</Button>
      </div>
      <div className="kit__row">
        <Tag active>Освіта</Tag>
        <Tag>Наука</Tag>
      </div>
      <div className="kit__grid">
        <Field label="Ім'я" name="name" hint="Так вас бачитимуть інші слухачі" />
        <Field label="Email" name="email" type="email" defaultValue="anna@" error="Email має бути у форматі name@example.com" />
        <Field label="Роль" name="role" defaultValue="Слухач" disabled />
      </div>
      <div className="kit__stack">
        <Alert variant="success" title="Готово.">Випуск додано у вибране.</Alert>
        <Alert variant="error" title="Помилка.">Не вдалося зберегти коментар.</Alert>
      </div>
      <div className="kit__grid">
        <Card episode={first} onOpen={(id) => console.log('Відкрити випуск', id)} />
        <Card episode={second} onOpen={(id) => console.log('Відкрити випуск', id)} />
      </div>
    </main>
  );
}
