import styles from './Favorites.module.css'

export function Favorites({ favorites, onSelect, currentCity }) {
  if (favorites.length === 0) return null

  return (
    <aside className={styles.aside} aria-label="Favorite cities">
      <h3 className={styles.title}>Favorites</h3>
      <ul className={styles.list}>
        {favorites.map((city) => (
          <li key={city}>
            <button
              type="button"
              className={currentCity === city ? styles.active : undefined}
              onClick={() => onSelect(city)}
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
