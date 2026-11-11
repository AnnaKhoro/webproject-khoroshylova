// Фільтр категорій: отримує перелік, кількості, поточне значення й функцію зміни.
// Активна категорія позначається модифікатором tag--active через компонент Tag.
import { Tag } from './Tag.jsx';

export function CategoryFilter({ categories, counts, value, onChange }) {
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  return (
    <div className="tags" aria-label="Категорії">
      <Tag active={value === null} onClick={() => onChange(null)}>Усі ({total})</Tag>
      {categories.map((c) => (
        <Tag key={c.slug} active={value === c.slug} onClick={() => onChange(c.slug)}>
          {c.name} ({counts[c.name] ?? 0})
        </Tag>
      ))}
    </div>
  );
}
