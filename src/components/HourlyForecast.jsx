import { WeatherIcon } from './WeatherIcon'
import styles from './HourlyForecast.module.css'

function formatTemp(temp, unit) {
  if (unit === 'imperial') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`
  }
  return `${Math.round(temp)}°C`
}

export function HourlyForecast({ hourlyForecast, unit }) {
  if (!hourlyForecast || hourlyForecast.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="hourly-forecast-heading">
      <h2 id="hourly-forecast-heading">Next 7 hours</h2>
      <ul className={styles.list}>
        {hourlyForecast.map((hour) => (
          <li key={hour.hour} className={styles.card}>
            <div className={styles.hour}>{hour.hour}</div>
            <WeatherIcon name={hour.icon} className={styles.icon} />
            <div className={styles.temp}>{formatTemp(hour.temp, unit)}</div>
            <div className={styles.desc}>{hour.description}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
