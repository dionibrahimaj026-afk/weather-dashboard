import { WeatherIcon } from './WeatherIcon'
import { CountryFlag } from './CountryFlag'
import { calculateWeatherScore } from '../utils/weatherScore'
import styles from './CompareView.module.css'

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

function formatCoords(lat, lon) {
  if (lat == null || lon == null) return ''
  const latStr = lat >= 0 ? `${lat.toFixed(2)}°N` : `${(-lat).toFixed(2)}°S`
  const lonStr = lon >= 0 ? `${lon.toFixed(2)}°E` : `${(-lon).toFixed(2)}°W`
  return `${latStr}, ${lonStr}`
}

export function CompareView({ citiesData, unit }) {
  if (!citiesData || citiesData.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="compare-heading">
      <h2 id="compare-heading">Compare cities</h2>
      <div className={styles.grid}>
        {citiesData.map((data) => {
          if (!data) return null
          const { location, current } = data
          const { total, breakdown } = calculateWeatherScore(current)
          return (
            <article key={location.name} className={styles.card}>
              <div className={styles.header}>
                <CountryFlag code={location.countryCode} className={styles.flag} title={location.country} />
                <div>
                  <h3 className={styles.city}>{location.name}</h3>
                  <span className={styles.score} title={`Temp: ${breakdown.temperature} | Humidity: ${breakdown.humidity} | Wind: ${breakdown.wind} | Alerts: ${breakdown.alerts} | Visibility: ${breakdown.visibility}`}>
                    {total}/100
                  </span>
                </div>
              </div>
              {location.description && (
                <p className={styles.cityDesc}>{location.description}</p>
              )}
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
              <div className={styles.main}>
                <WeatherIcon name={current.icon} className={styles.icon} />
                <div className={styles.tempBlock}>
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
              {data.forecast && (
                <div className={styles.forecastPreview}>
                  <span className={styles.forecastLabel}>7-day range</span>
                  <span className={styles.forecastRange}>
                    {formatTemp(Math.min(...data.forecast.map((d) => d.minTemp)), unit)} –{' '}
                    {formatTemp(Math.max(...data.forecast.map((d) => d.maxTemp)), unit)}
                  </span>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
