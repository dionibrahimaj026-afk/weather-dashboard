import { WeatherIcon } from './WeatherIcon'
import { CountryFlag } from './CountryFlag'
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

function formatCoords(lat, lon) {
  const latStr = lat >= 0 ? `${lat.toFixed(4)}° N` : `${(-lat).toFixed(4)}° S`
  const lonStr = lon >= 0 ? `${lon.toFixed(4)}° E` : `${(-lon).toFixed(4)}° W`
  return `${latStr}, ${lonStr}`
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
          {location.countryCode && (
            <CountryFlag code={location.countryCode} className={styles.flag} title={location.country} />
          )}
          {location.name}
        </div>
        {location.description && (
          <p className={styles.cityDesc}>{location.description}</p>
        )}
        {(location.population != null || location.timezone || location.localTime || (location.lat != null && location.lon != null)) && (
          <dl className={styles.meta}>
            {location.population != null && (
              <div>
                <dt>Population</dt>
                <dd>{location.population.toLocaleString()}</dd>
              </div>
            )}
            {location.timezone && (
              <div>
                <dt>Timezone</dt>
                <dd>{location.timezone}</dd>
              </div>
            )}
            {location.localTime && (
              <div>
                <dt>Local time</dt>
                <dd>{location.localTime}</dd>
              </div>
            )}
            {location.lat != null && location.lon != null && (
              <div>
                <dt>Coordinates</dt>
                <dd>{formatCoords(location.lat, location.lon)}</dd>
              </div>
            )}
          </dl>
        )}
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
