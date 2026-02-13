/**
 * Mock weather data: 7 cities, 7-day forecast. No backend/API.
 */
const MOCK_WEATHER = {
  london: {
    location: { name: 'London', country: 'United Kingdom', countryCode: 'GB' },
    current: { temp: 12, feelsLike: 10, description: 'Partly cloudy', icon: 'partly-cloudy', humidity: 72, windSpeed: 5.2 },
    hourlyForecast: [
      { hour: '14:00', temp: 12, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '15:00', temp: 11, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '16:00', temp: 11, icon: 'cloudy', description: 'Cloudy' },
      { hour: '17:00', temp: 10, icon: 'cloudy', description: 'Cloudy' },
      { hour: '18:00', temp: 9, icon: 'rain', description: 'Light rain' },
      { hour: '19:00', temp: 9, icon: 'rain', description: 'Light rain' },
      { hour: '20:00', temp: 8, icon: 'cloudy', description: 'Cloudy' },
    ],
    forecast: [
      { date: '2026-02-10', minTemp: 8, maxTemp: 13, description: 'Light rain', icon: 'rain' },
      { date: '2026-02-11', minTemp: 7, maxTemp: 11, description: 'Cloudy', icon: 'cloudy' },
      { date: '2026-02-12', minTemp: 6, maxTemp: 10, description: 'Clear', icon: 'clear' },
      { date: '2026-02-13', minTemp: 5, maxTemp: 9, description: 'Partly cloudy', icon: 'partly-cloudy' },
      { date: '2026-02-14', minTemp: 6, maxTemp: 11, description: 'Light rain', icon: 'rain' },
      { date: '2026-02-15', minTemp: 5, maxTemp: 10, description: 'Cloudy', icon: 'cloudy' },
      { date: '2026-02-16', minTemp: 6, maxTemp: 11, description: 'Partly cloudy', icon: 'partly-cloudy' },
    ],
  },
  'new york': {
    location: { name: 'New York', country: 'United States', countryCode: 'US' },
    current: { temp: 3, feelsLike: -1, description: 'Clear', icon: 'clear', humidity: 55, windSpeed: 4.0 },
    hourlyForecast: [
      { hour: '14:00', temp: 3, icon: 'clear', description: 'Clear' },
      { hour: '15:00', temp: 2, icon: 'clear', description: 'Clear' },
      { hour: '16:00', temp: 1, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '17:00', temp: 0, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '18:00', temp: -1, icon: 'cloudy', description: 'Cloudy' },
      { hour: '19:00', temp: -2, icon: 'snow', description: 'Snow' },
      { hour: '20:00', temp: -2, icon: 'snow', description: 'Snow' },
    ],
    forecast: [
      { date: '2026-02-10', minTemp: 0, maxTemp: 5, description: 'Snow', icon: 'snow' },
      { date: '2026-02-11', minTemp: -2, maxTemp: 4, description: 'Partly cloudy', icon: 'partly-cloudy' },
      { date: '2026-02-12', minTemp: 1, maxTemp: 7, description: 'Clear', icon: 'clear' },
      { date: '2026-02-13', minTemp: 2, maxTemp: 8, description: 'Cloudy', icon: 'cloudy' },
      { date: '2026-02-14', minTemp: 3, maxTemp: 9, description: 'Clear', icon: 'clear' },
      { date: '2026-02-15', minTemp: -5, maxTemp: -1, description: 'Snow storm', icon: 'snow-storm' },
      { date: '2026-02-16', minTemp: -3, maxTemp: 2, description: 'Snow', icon: 'snow' },
    ],
  },
  tokyo: {
    location: { name: 'Tokyo', country: 'Japan', countryCode: 'JP' },
    current: { temp: 8, feelsLike: 6, description: 'Cloudy', icon: 'cloudy', humidity: 65, windSpeed: 3.5 },
    hourlyForecast: [
      { hour: '14:00', temp: 8, icon: 'cloudy', description: 'Cloudy' },
      { hour: '15:00', temp: 9, icon: 'cloudy', description: 'Cloudy' },
      { hour: '16:00', temp: 8, icon: 'rain', description: 'Rain' },
      { hour: '17:00', temp: 7, icon: 'rain', description: 'Rain' },
      { hour: '18:00', temp: 6, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '19:00', temp: 6, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '20:00', temp: 5, icon: 'cloudy', description: 'Cloudy' },
    ],
    forecast: [
      { date: '2026-02-10', minTemp: 6, maxTemp: 11, description: 'Rain', icon: 'rain' },
      { date: '2026-02-11', minTemp: 5, maxTemp: 10, description: 'Partly cloudy', icon: 'partly-cloudy' },
      { date: '2026-02-12', minTemp: 7, maxTemp: 12, description: 'Clear', icon: 'clear' },
      { date: '2026-02-13', minTemp: 8, maxTemp: 14, description: 'Clear', icon: 'clear' },
      { date: '2026-02-14', minTemp: 9, maxTemp: 15, description: 'Partly cloudy', icon: 'partly-cloudy' },
      { date: '2026-02-15', minTemp: 8, maxTemp: 13, description: 'Cloudy', icon: 'cloudy' },
      { date: '2026-02-16', minTemp: 7, maxTemp: 12, description: 'Rain', icon: 'rain' },
    ],
  },
  paris: {
    location: { name: 'Paris', country: 'France', countryCode: 'FR' },
    current: { temp: 6, feelsLike: 3, description: 'Heavy rain', icon: 'rain', humidity: 88, windSpeed: 6.0 },
    hourlyForecast: [
      { hour: '14:00', temp: 6, icon: 'rain', description: 'Heavy rain' },
      { hour: '15:00', temp: 6, icon: 'rain', description: 'Rain' },
      { hour: '16:00', temp: 5, icon: 'rain', description: 'Light rain' },
      { hour: '17:00', temp: 5, icon: 'cloudy', description: 'Cloudy' },
      { hour: '18:00', temp: 5, icon: 'cloudy', description: 'Cloudy' },
      { hour: '19:00', temp: 4, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '20:00', temp: 4, icon: 'cloudy', description: 'Cloudy' },
    ],
    forecast: [
      { date: '2026-02-10', minTemp: 4, maxTemp: 8, description: 'Rain', icon: 'rain' },
      { date: '2026-02-11', minTemp: 3, maxTemp: 7, description: 'Cloudy', icon: 'cloudy' },
      { date: '2026-02-12', minTemp: 2, maxTemp: 6, description: 'Partly cloudy', icon: 'partly-cloudy' },
      { date: '2026-02-13', minTemp: 4, maxTemp: 9, description: 'Clear', icon: 'clear' },
      { date: '2026-02-14', minTemp: 5, maxTemp: 10, description: 'Clear', icon: 'clear' },
      { date: '2026-02-15', minTemp: 4, maxTemp: 8, description: 'Cloudy', icon: 'cloudy' },
      { date: '2026-02-16', minTemp: 3, maxTemp: 7, description: 'Light rain', icon: 'rain' },
    ],
  },
  sydney: {
    location: { name: 'Sydney', country: 'Australia', countryCode: 'AU' },
    current: { temp: 26, feelsLike: 28, description: 'Sunny', icon: 'clear', humidity: 45, windSpeed: 4.5 },
    hourlyForecast: [
      { hour: '14:00', temp: 26, icon: 'clear', description: 'Sunny' },
      { hour: '15:00', temp: 25, icon: 'clear', description: 'Clear' },
      { hour: '16:00', temp: 24, icon: 'clear', description: 'Clear' },
      { hour: '17:00', temp: 23, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '18:00', temp: 22, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '19:00', temp: 21, icon: 'cloudy', description: 'Cloudy' },
      { hour: '20:00', temp: 20, icon: 'cloudy', description: 'Cloudy' },
    ],
    forecast: [
      { date: '2026-02-10', minTemp: 22, maxTemp: 28, description: 'Partly cloudy', icon: 'partly-cloudy' },
      { date: '2026-02-11', minTemp: 21, maxTemp: 27, description: 'Clear', icon: 'clear' },
      { date: '2026-02-12', minTemp: 23, maxTemp: 29, description: 'Sunny', icon: 'clear' },
      { date: '2026-02-13', minTemp: 20, maxTemp: 25, description: 'Rain', icon: 'rain' },
      { date: '2026-02-14', minTemp: 19, maxTemp: 24, description: 'Cloudy', icon: 'cloudy' },
      { date: '2026-02-15', minTemp: 21, maxTemp: 26, description: 'Clear', icon: 'clear' },
      { date: '2026-02-16', minTemp: 22, maxTemp: 27, description: 'Partly cloudy', icon: 'partly-cloudy' },
    ],
  },
  berlin: {
    location: { name: 'Berlin', country: 'Germany', countryCode: 'DE' },
    current: { temp: 4, feelsLike: 1, description: 'Cloudy', icon: 'cloudy', humidity: 78, windSpeed: 8.5 },
    hourlyForecast: [
      { hour: '14:00', temp: 4, icon: 'cloudy', description: 'Cloudy' },
      { hour: '15:00', temp: 3, icon: 'cloudy', description: 'Cloudy' },
      { hour: '16:00', temp: 3, icon: 'rain', description: 'Light rain' },
      { hour: '17:00', temp: 2, icon: 'rain', description: 'Light rain' },
      { hour: '18:00', temp: 2, icon: 'cloudy', description: 'Cloudy' },
      { hour: '19:00', temp: 1, icon: 'partly-cloudy', description: 'Partly cloudy' },
      { hour: '20:00', temp: 1, icon: 'cloudy', description: 'Cloudy' },
    ],
    forecast: [
      { date: '2026-02-10', minTemp: 2, maxTemp: 6, description: 'Light rain', icon: 'rain' },
      { date: '2026-02-11', minTemp: 1, maxTemp: 5, description: 'Partly cloudy', icon: 'partly-cloudy' },
      { date: '2026-02-12', minTemp: 0, maxTemp: 4, description: 'Clear', icon: 'clear' },
      { date: '2026-02-13', minTemp: -1, maxTemp: 3, description: 'Snow', icon: 'snow' },
      { date: '2026-02-14', minTemp: 1, maxTemp: 5, description: 'Cloudy', icon: 'cloudy' },
      { date: '2026-02-15', minTemp: -2, maxTemp: 2, description: 'Snow storm', icon: 'snow-storm' },
      { date: '2026-02-16', minTemp: 0, maxTemp: 4, description: 'Snow', icon: 'snow' },
    ],
  },
  'oklahoma city': {
    location: { name: 'Oklahoma City', country: 'United States', countryCode: 'US' },
    current: { temp: 18, feelsLike: 16, description: 'Tornado watch', icon: 'tornado', humidity: 85, windSpeed: 12.0 },
    hourlyForecast: [
      { hour: '14:00', temp: 18, icon: 'tornado', description: 'Tornado watch' },
      { hour: '15:00', temp: 17, icon: 'thunderstorm', description: 'Thunderstorm' },
      { hour: '16:00', temp: 16, icon: 'thunderstorm', description: 'Thunderstorm' },
      { hour: '17:00', temp: 15, icon: 'rain', description: 'Heavy rain' },
      { hour: '18:00', temp: 14, icon: 'rain', description: 'Rain' },
      { hour: '19:00', temp: 13, icon: 'cloudy', description: 'Cloudy' },
      { hour: '20:00', temp: 12, icon: 'partly-cloudy', description: 'Partly cloudy' },
    ],
    forecast: [
      { date: '2026-02-10', minTemp: 15, maxTemp: 20, description: 'Thunderstorm', icon: 'thunderstorm' },
      { date: '2026-02-11', minTemp: 14, maxTemp: 22, description: 'Tornado risk', icon: 'tornado' },
      { date: '2026-02-12', minTemp: 12, maxTemp: 18, description: 'Heavy rain', icon: 'rain' },
      { date: '2026-02-13', minTemp: 10, maxTemp: 16, description: 'Cloudy', icon: 'cloudy' },
      { date: '2026-02-14', minTemp: 11, maxTemp: 17, description: 'Partly cloudy', icon: 'partly-cloudy' },
      { date: '2026-02-15', minTemp: 13, maxTemp: 19, description: 'Clear', icon: 'clear' },
      { date: '2026-02-16', minTemp: 14, maxTemp: 20, description: 'Clear', icon: 'clear' },
    ],
  },
}

const NORMALIZED_KEYS = Object.keys(MOCK_WEATHER).reduce((acc, key) => {
  acc[key.toLowerCase().trim()] = key
  return acc
}, {})

export function getMockWeatherByCity(cityName) {
  if (!cityName || typeof cityName !== 'string') return null
  const key = cityName.toLowerCase().trim()
  const dataKey = NORMALIZED_KEYS[key]
  if (!dataKey) return null
  return { ...MOCK_WEATHER[dataKey] }
}

export function getMockCityNames() {
  return Object.values(MOCK_WEATHER).map((d) => d.location.name)
}

export default MOCK_WEATHER
