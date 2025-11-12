import { useSearchParams } from 'react-router';
import { useSearchItemsQuery } from '@/entities/search/api/searchApi';
import ItemCard from '@/features/ItemCard/ItemCard';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q')?.trim() || '';

  const { data: items = [], isFetching, error } = useSearchItemsQuery(q, {
    skip: !q, // не искать, если q пустой
  });

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {q ? `Результаты поиска: "${q}"` : 'Все товары'}
      </h4>

      {isFetching ? (
        <p>Поиск...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Ошибка загрузки</p>
      ) : items.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {items.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      ) : q ? (
        <p style={{ textAlign: 'center' }}>Ничего не найдено по запросу «{q}»</p>
      ) : (
        <p style={{ textAlign: 'center' }}>Введите запрос в поиске</p>
      )}
    </div>
  );
}