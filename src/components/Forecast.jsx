import { WeatherIcon } from './WeatherIcon'
import styles from './Forecast.module.css'

function formatTemp(temp, unit) {
  if (unit === 'imperial') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`
  }
  return `${Math.round(temp)}°C`
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export function Forecast({ forecast, unit }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="forecast-heading">
      <h2 id="forecast-heading">Forecast</h2>
      <ul className={styles.list}>
        {forecast.map((day) => (
          <li key={day.date} className={styles.card}>
            <div className={styles.date}>{formatDate(day.date)}</div>
            <WeatherIcon name={day.icon} className={styles.icon} />
            <div className={styles.temps}>
              <span className={styles.max}>{formatTemp(day.maxTemp, unit)}</span>
              <span className={styles.min}>{formatTemp(day.minTemp, unit)}</span>
            </div>
            <div className={styles.desc}>{day.description}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
