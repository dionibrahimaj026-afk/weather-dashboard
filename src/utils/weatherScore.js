/**
 * Calculate weather score (0–100) from temperature, humidity, wind, alerts, visibility.
 * Each factor contributes up to 20 points.
 */

const WIND_ALERT_THRESHOLD_MS = 6
const TORNADO_KEYWORDS = ['tornado', 'tornado watch', 'tornado warning', 'tornado risk']
const SNOW_STORM_KEYWORDS = ['snow storm', 'snowstorm', 'blizzard']
const HEAVY_RAIN_KEYWORDS = ['heavy rain', 'heavy rainfall']
const IDEAL_TEMP_C = 21
const IDEAL_HUMIDITY = 50
const MAX_WIND_MS = 12

function hasAlerts(current) {
  if (!current) return true
  const desc = (current.description || '').toLowerCase()
  if (TORNADO_KEYWORDS.some((k) => desc.includes(k))) return true
  if (SNOW_STORM_KEYWORDS.some((k) => desc.includes(k))) return true
  if (HEAVY_RAIN_KEYWORDS.some((k) => desc.includes(k)) || desc === 'rain') return true
  if (current.windSpeed >= WIND_ALERT_THRESHOLD_MS) return true
  return false
}

function tempScore(temp) {
  const diff = Math.abs((temp ?? 0) - IDEAL_TEMP_C)
  return Math.max(0, 20 - (diff / 5))
}

function humidityScore(humidity) {
  const h = humidity ?? 50
  const diff = Math.abs(h - IDEAL_HUMIDITY)
  return Math.max(0, 20 - (diff / 2.5))
}

function windScore(windSpeed) {
  const w = windSpeed ?? 0
  return Math.max(0, 20 - (w / MAX_WIND_MS) * 20)
}

function alertsScore(current) {
  return hasAlerts(current) ? 0 : 20
}

function visibilityScore(visibility) {
  const v = visibility ?? 0
  return Math.min(20, (v / 10) * 20)
}

/**
 * @param {Object} current - current weather { temp, humidity, windSpeed, visibility, description }
 * @returns {{ total: number, breakdown: { temperature, humidity, wind, alerts, visibility } }}
 */
export function calculateWeatherScore(current) {
  if (!current) {
    return { total: 0, breakdown: { temperature: 0, humidity: 0, wind: 0, alerts: 0, visibility: 0 } }
  }

  const breakdown = {
    temperature: Math.round(tempScore(current.temp) * 10) / 10,
    humidity: Math.round(humidityScore(current.humidity) * 10) / 10,
    wind: Math.round(windScore(current.windSpeed) * 10) / 10,
    alerts: alertsScore(current),
    visibility: Math.round(visibilityScore(current.visibility) * 10) / 10,
  }

  const total = Math.round(
    (breakdown.temperature + breakdown.humidity + breakdown.wind + breakdown.alerts + breakdown.visibility) * 10
  ) / 10

  return { total: Math.min(100, total), breakdown }
}
