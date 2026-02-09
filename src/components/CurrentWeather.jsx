import { WeatherIcon } from './WeatherIcon'
import styles from './CurrentWeather.module.css'

function formatTemp(temp, unit) {
  if (unit === 'imperial') {
    const f = Math.round((temp * 9) / 5 + 32)
    return `${f}°F`
  }
  return `${Math.round(temp)}°C`
}

function formatWind(speedMs, unit) {
  if (unit === 'imperial') {
    const mph = (speedMs * 3600) / 1609.344
    return `${mph.toFixed(1)} mph`
  }
  return `${speedMs.toFixed(1)} m/s`
}

export function CurrentWeather({ data, unit, onAddFavorite, isFavorite }) {
  if (!data) return null

  const { location, current } = data

  return (
    <section className={styles.section} aria-labelledby="current-weather-heading">
      <div className={styles.headingRow}>
        <h2 id="current-weather-heading">Current weather</h2>
        <button
          type="button"
          className={styles.favButton}
          onClick={() => onAddFavorite(location.name)}
          aria-pressed={isFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★ Favorited' : '☆ Add to favorites'}
        </button>
      </div>
      <div className={styles.card}>
        <div className={styles.location}>
          {location.name}, {location.country}
        </div>
        <div className={styles.main}>
          <WeatherIcon name={current.icon} className={styles.icon} />
          <div>
            <span className={styles.temp}>{formatTemp(current.temp, unit)}</span>
            <span className={styles.desc}>{current.description}</span>
          </div>
        </div>
        <dl className={styles.details}>
          <div>
            <dt>Feels like</dt>
            <dd>{formatTemp(current.feelsLike, unit)}</dd>
          </div>
          <div>
            <dt>Humidity</dt>
            <dd>{current.humidity}%</dd>
          </div>
          <div>
            <dt>Wind</dt>
            <dd>{formatWind(current.windSpeed, unit)}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
