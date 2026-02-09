import { useState, useEffect, useCallback } from 'react'
import { getMockWeatherByCity } from './data/mockWeather'
import { delay } from './utils/delay'
import { useDebounce } from './utils/useDebounce'
import { getFavorites, addFavorite, removeFavorite } from './utils/storage'
import { Search } from './components/Search'
import { CurrentWeather } from './components/CurrentWeather'
import { Forecast } from './components/Forecast'
import { Favorites } from './components/Favorites'
import styles from './App.module.css'

const SEARCH_DELAY_MS = 700

export default function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [unit, setUnit] = useState('metric') // 'metric' | 'imperial'
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) {
      return document.documentElement.getAttribute('data-theme')
    }
    return 'light'
  })
  const [favorites, setFavorites] = useState(getFavorites)

  const debouncedInput = useDebounce(searchInput, 300)

  const loadWeather = useCallback(async (cityName) => {
    setError(null)
    setLoading(true)
    try {
      await delay(SEARCH_DELAY_MS)
      const data = getMockWeatherByCity(cityName)
      if (data) {
        setWeather(data)
        setError(null)
      } else {
        setWeather(null)
        setError('City not found. Try London, New York, Tokyo, Paris, or Sydney.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  function handleSearch(query) {
    setSearchInput(query)
    loadWeather(query)
  }

  function handleFavoriteSelect(cityName) {
    setSearchInput(cityName)
    loadWeather(cityName)
  }

  function handleAddFavorite(cityName) {
    const isFav = favorites.includes(cityName)
    if (isFav) {
      setFavorites(removeFavorite(cityName))
    } else {
      setFavorites(addFavorite(cityName))
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Optional: auto-search after 300ms of no typing when input differs from current city
  useEffect(() => {
    const q = (debouncedInput || '').trim()
    if (!q || loading) return
    if (weather?.location?.name?.toLowerCase() === q.toLowerCase()) return
    loadWeather(q)
  }, [debouncedInput, loading, weather?.location?.name, loadWeather])

  const currentCity = weather?.location?.name ?? null
  const isFavorite = currentCity ? favorites.includes(currentCity) : false

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <Search
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearch}
          loading={loading}
          placeholder="e.g. London, New York, Tokyo"
        />
        <div className={styles.controls}>
          <div className={styles.unitToggle} role="group" aria-label="Units">
            <button
              type="button"
              aria-pressed={unit === 'metric'}
              onClick={() => setUnit('metric')}
            >
              °C / m/s
            </button>
            <button
              type="button"
              aria-pressed={unit === 'imperial'}
              onClick={() => setUnit('imperial')}
            >
              °F / mph
            </button>
          </div>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {favorites.length > 0 && (
        <Favorites
          favorites={favorites}
          onSelect={handleFavoriteSelect}
          currentCity={currentCity}
        />
      )}

      <main className={styles.main}>
        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}
        {loading && !weather && (
          <div className={styles.loading} aria-live="polite">
            Loading weather…
          </div>
        )}
        {weather && !loading && (
          <>
            <CurrentWeather
              data={weather}
              unit={unit}
              onAddFavorite={handleAddFavorite}
              isFavorite={isFavorite}
            />
            <Forecast forecast={weather.forecast} unit={unit} />
          </>
        )}
        {!weather && !loading && !error && (
          <p className={styles.hint}>
            Search for a city to see current weather and forecast. Try London, New York, Tokyo, Paris, or Sydney.
          </p>
        )}
      </main>
    </div>
  )
}
