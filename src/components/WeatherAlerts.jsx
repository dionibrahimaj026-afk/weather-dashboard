import styles from './WeatherAlerts.module.css'

const WIND_ALERT_THRESHOLD_MS = 6
const HEAVY_RAIN_KEYWORDS = ['heavy rain', 'heavy rainfall']
const TORNADO_KEYWORDS = ['tornado', 'tornado watch', 'tornado warning', 'tornado risk']
const SNOW_STORM_KEYWORDS = ['snow storm', 'snowstorm', 'blizzard']

function formatWind(speedMs, unit) {
  if (unit === 'imperial') {
    const mph = (speedMs * 3600) / 1609.344
    return `${mph.toFixed(1)} mph`
  }
  return `${speedMs.toFixed(1)} m/s`
}

function getAlerts(current, unit) {
  if (!current) return []
  const alerts = []
  const desc = (current.description || '').toLowerCase()

  if (TORNADO_KEYWORDS.some((k) => desc.includes(k))) {
    alerts.push({ id: 'tornado', type: 'tornado', message: 'Tornado alert — seek shelter immediately. Stay away from windows.' })
  }
  if (SNOW_STORM_KEYWORDS.some((k) => desc.includes(k))) {
    alerts.push({ id: 'snow-storm', type: 'snow-storm', message: 'Snow storm alert — avoid travel. Stay indoors if possible.' })
  }
  if (HEAVY_RAIN_KEYWORDS.some((k) => desc.includes(k)) || desc === 'rain') {
    alerts.push({ id: 'heavy-rain', type: 'rain', message: 'Heavy rain alert — stay safe, avoid flooded areas.' })
  }
  if (current.windSpeed >= WIND_ALERT_THRESHOLD_MS) {
    alerts.push({
      id: 'high-wind',
      type: 'wind',
      message: `High wind alert — ${formatWind(current.windSpeed, unit)} winds. Secure loose objects.`,
    })
  }
  return alerts
}

export function WeatherAlerts({ current, unit }) {
  const alerts = getAlerts(current, unit)
  if (alerts.length === 0) return null

  return (
    <div className={styles.wrapper} role="alert" aria-live="polite">
      {alerts.map((alert) => (
        <div key={alert.id} className={alert.type === 'tornado' || alert.type === 'snow-storm' ? styles.alertSevere : styles.alert}>
          <span className={styles.icon}>
            {alert.type === 'tornado' ? '🌪️' : alert.type === 'snow-storm' ? '🌨️' : alert.type === 'rain' ? '🌧️' : '💨'}
          </span>
          <span className={styles.message}>{alert.message}</span>
        </div>
      ))}
    </div>
  )
}
