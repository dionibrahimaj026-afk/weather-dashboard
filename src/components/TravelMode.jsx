import { CountryFlag } from './CountryFlag'
import { WeatherIcon } from './WeatherIcon'
import styles from './TravelMode.module.css'

function formatTemp(temp, unit) {
  if (unit === 'imperial') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`
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

export function TravelMode({ data, unit, onSelectCity }) {
  if (!data) {
    return (
      <section className={styles.section} aria-labelledby="travel-mode-heading">
        <h2 id="travel-mode-heading" className={styles.title}>
          ✈️ Best city to visit today
        </h2>
        <div className={styles.noResult}>
          <p>No city recommended — all have active weather alerts.</p>
          <p className={styles.noResultHint}>Try again later when conditions improve.</p>
        </div>
      </section>
    )
  }

  const { location, current } = data

  return (
    <section className={styles.section} aria-labelledby="travel-mode-heading">
      <h2 id="travel-mode-heading" className={styles.title}>
        ✈️ Best city to visit today
      </h2>
      <p className={styles.subtitle}>
        Based on comfortable temperature, low wind, no alerts, and good visibility
      </p>
      <div className={styles.card}>
        <div className={styles.header}>
          <CountryFlag code={location.countryCode} className={styles.flag} title={location.country} />
          <div>
            <h3 className={styles.city}>{location.name}</h3>
            <p className={styles.country}>{location.country}</p>
          </div>
        </div>
        <div className={styles.weather}>
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
            <dt>Wind</dt>
            <dd>{formatWind(current.windSpeed, unit)}</dd>
          </div>
          <div>
            <dt>Visibility</dt>
            <dd>{current.visibility ?? '—'} km</dd>
          </div>
          <div>
            <dt>Alerts</dt>
            <dd className={styles.noAlerts}>None ✓</dd>
          </div>
        </dl>
        {location.description && (
          <p className={styles.cityDesc}>{location.description}</p>
        )}
        {onSelectCity && (
          <button
            type="button"
            className={styles.viewBtn}
            onClick={() => onSelectCity(location.name)}
          >
            View full forecast →
          </button>
        )}
      </div>
    </section>
  )
}
