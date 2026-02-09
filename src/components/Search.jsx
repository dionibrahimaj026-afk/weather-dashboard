import styles from './Search.module.css'

export function Search({ value = '', onChange, onSearch, loading, placeholder = 'e.g. London, New York' }) {
  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = (value || '').trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit} role="search">
        <label htmlFor="city-search" className="visually-hidden">
          City name
        </label>
        <input
          id="city-search"
          type="search"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={loading}
          autoComplete="off"
          aria-label="Search by city name"
        />
        <button type="submit" className={styles.button} disabled={loading} aria-busy={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>
    </header>
  )
}
