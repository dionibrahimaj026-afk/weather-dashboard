const FAVORITES_KEY = 'weather-dashboard-favorites'

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function setFavorites(cities) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(cities))
  } catch (e) {
    console.warn('Could not save favorites', e)
  }
}

export function addFavorite(cityName) {
  const list = getFavorites()
  const name = String(cityName).trim()
  if (!name || list.includes(name)) return list
  const next = [...list, name]
  setFavorites(next)
  return next
}

export function removeFavorite(cityName) {
  const list = getFavorites().filter((c) => c !== String(cityName).trim())
  setFavorites(list)
  return list
}
