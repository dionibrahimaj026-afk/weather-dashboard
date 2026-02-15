import { useState, useEffect, useCallback } from 'react'
import { getMockWeatherByCity, getMockCityNames, getBestCityForTravel } from './data/mockWeather'
import { delay } from './utils/delay'
import { getFavorites, addFavorite, removeFavorite } from './utils/storage'
import { Search } from './components/Search'
import { CurrentWeather } from './components/CurrentWeather'
import { Forecast } from './components/Forecast'
import { HourlyForecast } from './components/HourlyForecast'
import { CompareView } from './components/CompareView'
import { TravelMode } from './components/TravelMode'
import { Favorites } from './components/Favorites'
import { WeatherAlerts } from './components/WeatherAlerts'
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
  const [compareMode, setCompareMode] = useState(false)
  const [compareCities, setCompareCities] = useState([])
  const [travelMode, setTravelMode] = useState(false)

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
        setError('City not found. Try London, New York, Tokyo, Paris, Sydney, Berlin, or Oklahoma City.')
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

  function toggleCompareCity(cityName) {
    setCompareCities((prev) => {
      if (prev.includes(cityName)) return prev.filter((c) => c !== cityName)
      if (prev.length >= 4) return prev
      return [...prev, cityName]
    })
  }

  const compareWeatherData = compareCities
    .map((name) => getMockWeatherByCity(name))
    .filter(Boolean)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const currentCity = weather?.location?.name ?? null
  const isFavorite = currentCity ? favorites.includes(currentCity) : false
  const quickCities = getMockCityNames()

  function handleSurpriseMe() {
    const cities = getMockCityNames()
    const random = cities[Math.floor(Math.random() * cities.length)]
    handleSearch(random)
  }

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
        <div className={styles.quickRow}>
          <span className={styles.quickLabel}>Quick:</span>
          <div className={styles.quickCities}>
            {quickCities.map((city) => (
              <button
                key={city}
                type="button"
                className={currentCity === city ? styles.chipActive : styles.chip}
                onClick={() => handleSearch(city)}
                disabled={loading}
              >
                {city}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.surpriseBtn}
            onClick={handleSurpriseMe}
            disabled={loading}
            title="Load a random city"
          >
            🎲 Surprise me
          </button>
        </div>
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
          <button
            type="button"
            className={compareMode ? styles.compareBtnActive : styles.compareBtn}
            onClick={() => { setCompareMode((m) => !m); setTravelMode(false) }}
            aria-pressed={compareMode}
            title="Compare cities"
          >
            📊 Compare
          </button>
          <button
            type="button"
            className={travelMode ? styles.compareBtnActive : styles.compareBtn}
            onClick={() => { setTravelMode((m) => !m); setCompareMode(false) }}
            aria-pressed={travelMode}
            title="Best city to visit today"
          >
            ✈️ Travel
          </button>
        </div>
      </div>

      {compareMode && (
        <div className={styles.compareRow}>
          <span className={styles.compareLabel}>Select cities (2–4):</span>
          <div className={styles.compareCities}>
            {quickCities.map((city) => {
              const selected = compareCities.includes(city)
              return (
                <button
                  key={city}
                  type="button"
                  className={selected ? styles.chipActive : styles.chip}
                  onClick={() => toggleCompareCity(city)}
                  title={selected ? 'Remove from comparison' : 'Add to comparison'}
                >
                  {city}
                </button>
              )
            })}
          </div>
        </div>
      )}

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
        {travelMode && (
          <TravelMode
            data={getBestCityForTravel()}
            unit={unit}
            onSelectCity={(city) => { setTravelMode(false); handleSearch(city) }}
          />
        )}
        {compareMode && (
          <>
            {compareWeatherData.length >= 2 ? (
              <CompareView citiesData={compareWeatherData} unit={unit} />
            ) : (
              <p className={styles.hint}>
                Select 2–4 cities above to compare weather side by side.
              </p>
            )}
          </>
        )}
        {!compareMode && loading && !weather && (
          <div className={styles.loading} aria-live="polite">
            Loading weather…
          </div>
        )}
        {!compareMode && weather && !loading && (
          <>
            <WeatherAlerts current={weather.current} unit={unit} />
            <CurrentWeather
              data={weather}
              unit={unit}
              onAddFavorite={handleAddFavorite}
              isFavorite={isFavorite}
            />
            <HourlyForecast hourlyForecast={weather.hourlyForecast} unit={unit} />
            <Forecast forecast={weather.forecast} unit={unit} />
          </>
        )}
        {!compareMode && !weather && !loading && !error && (
          <p className={styles.hint}>
            Search for a city to see current weather and forecast. Try London, New York, Tokyo, Paris, Sydney, Berlin, or Oklahoma City.
          </p>
        )}
      </main>

      <footer className={styles.footer}>
        Weather Dashboard · v1.1.0
      </footer>
    </div>
  )
}
