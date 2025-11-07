import type { JSX } from 'react';
import { Link } from 'react-router'; 
import styles from './CategoryCard.module.css';

type Props = {
  id: number;
  name: string;
  photo: string;
}

function CategoryCard({ id, name, photo }: Props): JSX.Element {
  return (
    <Link
      to={`/category/${id}`}
      className={`category-card d-flex align-items-center p-4 text-decoration-none rounded shadow-sm h-100 ${styles.card}`}
    >
      <img src={photo} alt={name} className="me-3 icon" />
      <span>{name}</span>
    </Link>
  );
}

export default CategoryCard;