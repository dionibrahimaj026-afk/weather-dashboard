/**
 * Simple icon mapping for weather conditions (no external icon lib).
 */
const ICONS = {
  clear: '☀️',
  cloudy: '☁️',
  'partly-cloudy': '⛅',
  rain: '🌧️',
  snow: '❄️',
  tornado: '🌪️',
  'snow-storm': '🌨️',
  thunderstorm: '⛈️',
}

export function WeatherIcon({ name, className = '' }) {
  return (
    <span className={className} role="img" aria-hidden="true">
      {ICONS[name] || '🌡️'}
    </span>
  )
}
