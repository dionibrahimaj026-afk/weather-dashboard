# Weather Dashboard – Complete Starter Guide

This is a **very detailed** explanation of the whole project for beginners. You can read it from top to bottom to understand how everything works.

---

## Table of contents

1. [What is this project?](#1-what-is-this-project)
2. [How to run the app](#2-how-to-run-the-app)
3. [Technologies used (simple explanations)](#3-technologies-used-simple-explanations)
4. [Project folder structure](#4-project-folder-structure)
5. [How the app starts (entry point)](#5-how-the-app-starts-entry-point)
6. [The main App component](#6-the-main-app-component)
7. [Mock weather data](#7-mock-weather-data)
8. [Utility functions](#8-utility-functions)
9. [UI components (Search, CurrentWeather, Forecast, Favorites, WeatherIcon)](#9-ui-components)
10. [Styling (CSS and themes)](#10-styling-css-and-themes)
11. [What happens when you do something (user flows)](#11-what-happens-when-you-do-something-user-flows)
12. [Key concepts recap](#12-key-concepts-recap)
13. [How to change or add things](#13-how-to-change-or-add-things)

---

## 1. What is this project?

The **Weather Dashboard** is a small web application where you can:

- Type a city name and click **Search** to see “weather” for that city.
- See **current weather** (temperature, feels like, description, humidity, wind).
- See a **5-day forecast** (date, min/max temperature, description).
- Switch between **metric** (°C, m/s) and **imperial** (°F, mph).
- **Add cities to favorites** and click them later to load their weather.
- Switch between **light and dark** theme.

Important: there is **no real weather API**. All data comes from a **mock data file** inside the project (fake data for 5 cities: London, New York, Tokyo, Paris, Sydney). So the app works fully offline and is ideal for learning.

---

## 2. How to run the app

You need **Node.js** installed (e.g. from [nodejs.org](https://nodejs.org)).

In a terminal, from the project folder:

```bash
npm install
npm start
```

Then open your browser at **http://localhost:5173**.

- `npm install` – downloads all dependencies (React, Vite, etc.) into the `node_modules` folder.
- `npm start` – runs the development server (Vite). The page will auto-refresh when you change the code.

Other useful commands:

- `npm run build` – creates a production build in the `dist` folder.
- `npm run preview` – serves that production build locally so you can test it.

---

## 3. Technologies used (simple explanations)

| Term | What it means in this project |
|------|-------------------------------|
| **React** | A JavaScript library for building the user interface. You build the UI from small pieces called **components** (e.g. Search, CurrentWeather). |
| **Vite** | A tool that bundles your code and runs a dev server. It’s faster than older tools like Create React App. |
| **JSX** | A syntax that looks like HTML inside JavaScript (e.g. `<div className={styles.card}>`). React uses it to describe what to show on the page. |
| **Component** | A reusable piece of UI (a function that returns JSX). Examples: `Search`, `CurrentWeather`, `Forecast`. |
| **Props** | Data you pass *into* a component from its parent (e.g. `value={searchInput}`, `unit={unit}`). The component uses props to know what to display. |
| **State** | Data that can change over time and that lives inside a component (e.g. the list of favorites, the current weather). When state changes, React re-renders the relevant part of the page. |
| **Hooks** | Special React functions that let you use state and other features inside function components. We use `useState`, `useEffect`, `useCallback`. |
| **CSS Modules** | CSS files whose class names are turned into unique names so they don’t clash. We import them like `import styles from './App.module.css'` and use `className={styles.someClass}`. |
| **localStorage** | A browser feature to save small data (e.g. list of favorite cities) so it stays even after you close the tab. We use it only for favorites; no backend or database. |

---

## 4. Project folder structure

```
weather-dashboard/
├── index.html              ← Single HTML page; has <div id="root"> and loads main.jsx
├── package.json            ← Project config and scripts (npm start, etc.)
├── vite.config.js         ← Vite configuration (e.g. React plugin)
├── .gitignore              ← Tells Git which files/folders not to track
├── README.md               ← Short project description and how to run
├── docs/                   ← Extra documentation (this guide, diagrams)
│   ├── STARTER-GUIDE.md    ← This file
│   └── diagram.md          ← Mermaid diagrams
└── src/
    ├── main.jsx            ← Entry: mounts the React app into index.html
    ├── App.jsx             ← Main component: state, search logic, layout
    ├── App.module.css      ← Styles for App
    ├── index.css            ← Global styles and CSS variables (theme colors)
    ├── data/
    │   └── mockWeather.js  ← Fake weather for 5 cities (current + forecast)
    ├── utils/
    │   ├── delay.js        ← Simulates loading delay (e.g. 700 ms)
    │   └── storage.js      ← Read/write favorites in localStorage
    └── components/
        ├── Search.jsx           ← Search input + Search button
        ├── Search.module.css
        ├── CurrentWeather.jsx  ← Current temp, feels like, humidity, wind, favorite button
        ├── CurrentWeather.module.css
        ├── Forecast.jsx         ← 5-day forecast cards
        ├── Forecast.module.css
        ├── Favorites.jsx        ← List of favorite cities (buttons)
        ├── Favorites.module.css
        ├── WeatherIcon.jsx     ← Maps condition name to emoji (e.g. rain → 🌧️)
```

---

## 5. How the app starts (entry point)

### index.html

The only HTML file. The important parts:

- `<div id="root"></div>` – empty box where the whole React app will be rendered.
- `<script type="module" src="/src/main.jsx"></script>` – loads the JavaScript entry point.

So the browser loads `index.html`, then runs `main.jsx`.

### src/main.jsx

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

What this does:

1. **Import** React, the function that puts the app in the DOM (`createRoot`), the main `App` component, and global CSS.
2. **Find** the DOM element with `id="root"` (the div in `index.html`).
3. **Create** a React root for that element and **render** `<App />` inside it. From here on, everything you see is drawn by React components, starting with `App`.

`React.StrictMode` is a helper that highlights some potential problems in development; it doesn’t change behavior in production.

---

## 6. The main App component

**File:** `src/App.jsx`

`App` is the “brain” of the app: it holds the main **state**, loads weather from mock data, and decides what to show (search bar, current weather, forecast, favorites, errors, loading message).

### Imports

- `useState`, `useEffect`, `useCallback` – React hooks.
- `getMockWeatherByCity` – gets fake weather for a city name from `mockWeather.js`.
- `delay` – waits a number of milliseconds (to simulate loading).
- `getFavorites`, `addFavorite`, `removeFavorite` – read/update favorites in localStorage.
- The UI components: `Search`, `CurrentWeather`, `Forecast`, `Favorites`.
- `styles` from `App.module.css` for layout and appearance.

### State variables (useState)

| State | Type | Purpose |
|-------|------|--------|
| `weather` | object or null | Current weather + forecast for the selected city. `null` when nothing is loaded yet or city not found. |
| `loading` | boolean | True while we’re “loading” (during the delay + mock lookup). Used to show “Loading weather…” and disable the search button. |
| `error` | string or null | Error message to show, e.g. “City not found…”. |
| `searchInput` | string | The text in the search box. Kept in App so we can also set it when the user clicks a favorite. |
| `unit` | 'metric' or 'imperial' | Whether to show °C/m/s or °F/mph. |
| `theme` | 'light' or 'dark' | Used to set `data-theme` on the HTML element for CSS variables. |
| `favorites` | array of strings | List of favorite city names. Initial value comes from `getFavorites()` (localStorage). |

### loadWeather (useCallback)

```javascript
const loadWeather = useCallback(async (cityName) => {
  setError(null)
  setLoading(true)
  try {
    await delay(SEARCH_DELAY_MS)   // wait ~700 ms
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
```

- **Called** when the user searches (clicks Search or presses Enter) or clicks a favorite city.
- **Steps:** clear error, set loading true, wait 700 ms, look up the city in mock data. If found, set `weather` and clear error; if not, set `weather` to null and set the “City not found” message. In the end, always set `loading` to false.
- **useCallback** with `[]` means the function reference stays the same on every render (useful if you pass it to child components).

### Event handlers

- **handleSearch(query)** – Sets `searchInput` to `query` and calls `loadWeather(query)`.
- **handleFavoriteSelect(cityName)** – Sets `searchInput` to the city and calls `loadWeather(cityName)` so that city’s weather is shown.
- **handleAddFavorite(cityName)** – If the city is already in `favorites`, it removes it; otherwise it adds it. Uses `addFavorite` / `removeFavorite` from `storage.js` and then updates `favorites` state with the new list.

### useEffect for theme

```javascript
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme)
}, [theme])
```

Whenever `theme` changes, the `<html>` element gets `data-theme="light"` or `data-theme="dark"`. The CSS uses this to switch color variables (see [Styling](#10-styling-css-and-themes)).

### Derived values

- `currentCity` – `weather?.location?.name` or null. Used to highlight the active city in Favorites and to know which city to add/remove from favorites.
- `isFavorite` – whether `currentCity` is in the `favorites` array. Passed to `CurrentWeather` so the favorite button can show “Favorited” or “Add to favorites”.

### What gets rendered (JSX structure)

- **Toolbar:** `Search` (with `value`, `onChange`, `onSearch`, `loading`) and controls (unit toggle + theme button).
- **Favorites:** Rendered only if `favorites.length > 0`; receives `favorites`, `onSelect`, `currentCity`.
- **Main area:**
  - If there’s an `error`, show the error message.
  - If `loading` and no `weather` yet, show “Loading weather…”.
  - If we have `weather` and not loading, show `CurrentWeather` and `Forecast` with the right props.
  - If there’s no weather, no loading, and no error, show a hint: “Search for a city…”.

So: one source of truth (`weather`, `loading`, `error`) drives the whole main content.

---

## 7. Mock weather data

**File:** `src/data/mockWeather.js`

This file is the **only** source of “weather” in the app. There is no server and no real API.

### Structure

- **MOCK_WEATHER** – an object whose keys are **normalized city names** (lowercase, e.g. `'london'`, `'new york'`). Each value is an object with:
  - **location** – `{ name, country }`.
  - **current** – `temp`, `feelsLike`, `description`, `icon`, `humidity`, `windSpeed` (wind in m/s).
  - **forecast** – array of 5 objects: `date`, `minTemp`, `maxTemp`, `description`, `icon`.

### NORMALIZED_KEYS

Built from `MOCK_WEATHER` so we can look up by lowercase trimmed name:

- e.g. `"London"` → key `"london"` → points to the same data as `MOCK_WEATHER.london`.

### getMockWeatherByCity(cityName)

- Takes a string (e.g. `"London"`, `"New York"`).
- Normalizes it (lowercase, trim), finds it in `NORMALIZED_KEYS`, and returns a **copy** of that city’s data (so the original mock object is never mutated).
- Returns `null` if the city is not in the list.

So: if the user types a city that isn’t one of the 5 mock cities, `getMockWeatherByCity` returns `null`, and App shows “City not found”.

---

## 8. Utility functions

### src/utils/delay.js

```javascript
export function delay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

- Returns a **Promise** that resolves after `ms` milliseconds.
- Used in `loadWeather` so we see a short “Loading…” state before showing the mock result. No real network call.

### src/utils/storage.js

Favorites are stored in the browser’s **localStorage** under the key `'weather-dashboard-favorites'`. The value is a JSON array of city names, e.g. `["London", "Tokyo"]`.

- **getFavorites()** – reads that key, parses JSON, returns an array (or `[]` if missing/invalid).
- **setFavorites(cities)** – saves the array to localStorage.
- **addFavorite(cityName)** – gets current list, adds the city if not already there, saves, returns the new array.
- **removeFavorite(cityName)** – filters out that city, saves, returns the new array.

App uses these to keep the `favorites` state in sync with what’s stored, and to persist favorites across page reloads.

---

## 9. UI components

### Search (Search.jsx)

- **Props:** `value` (current input text), `onChange` (called when input changes, with the new value), `onSearch` (called when the form is submitted with a non-empty value), `loading`, `placeholder`.
- **Controlled input:** The input’s `value` is `value` from props, and `onChange` calls `onChange?.(e.target.value)`. So the real value lives in App’s `searchInput` state; Search just displays it and reports changes.
- **Form submit:** `handleSubmit` prevents the default form submit, trims the value, and if it’s not empty calls `onSearch(trimmed)`. So searching happens only when the user clicks Search or presses Enter.
- **Loading:** When `loading` is true, the input and button are disabled, and the button text becomes “Searching…”.

### CurrentWeather (CurrentWeather.jsx)

- **Props:** `data` (full weather object from mock), `unit` ('metric' or 'imperial'), `onAddFavorite` (function called with city name when the user clicks the favorite button), `isFavorite` (boolean).
- **Early return:** If `!data`, returns `null` (nothing is rendered).
- **Temperature:** Uses a small `formatTemp(temp, unit)` that converts to °C or °F.
- **Wind:** `formatWind(speedMs, unit)` converts m/s to mph when unit is imperial.
- **Layout:** Location name, big temp + description + icon, then a definition list for “Feels like”, “Humidity”, “Wind”. Button toggles “Add to favorites” / “Favorited” and calls `onAddFavorite(location.name)`; `aria-pressed={isFavorite}` for accessibility.

### Forecast (Forecast.jsx)

- **Props:** `forecast` (array of day objects), `unit`.
- **Early return:** If no forecast or empty array, returns `null`.
- **List:** Maps each day to a list item: formatted date (`formatDate(day.date)`), `WeatherIcon`, min/max temps, description. Each item has `key={day.date}` so React can track them efficiently.

### Favorites (Favorites.jsx)

- **Props:** `favorites` (array of city names), `onSelect(cityName)` (called when a city is clicked), `currentCity` (name of the city whose weather is currently shown).
- **Early return:** If `favorites.length === 0`, returns `null` (so the favorites block doesn’t show when there are no favorites).
- **List:** Each favorite is a button. Clicking it calls `onSelect(city)`. The button for `currentCity` gets an extra class so it looks “active”.

### WeatherIcon (WeatherIcon.jsx)

- **Props:** `name` (e.g. `'clear'`, `'rain'`), optional `className`.
- **Mapping:** A simple object maps names to emoji (e.g. `rain` → '🌧️'). Renders a `<span>` with that emoji and the given class. Used by CurrentWeather and Forecast so we don’t need an external icon library.

---

## 10. Styling (CSS and themes)

### index.css (global)

- **:root** – defines CSS variables for the **light** theme: `--bg`, `--surface`, `--text`, `--text-muted`, `--accent`, `--border`, `--error`, etc.
- **[data-theme="dark"]** – overrides those variables for the **dark** theme (darker backgrounds, lighter text).
- **box-sizing**, **body**, **#root**, **button**, **input** – global resets and base styles.

So the whole app uses these variables; switching `data-theme` on `<html>` switches the theme without changing component CSS.

### Component CSS (e.g. App.module.css)

- Each component has a `.module.css` file. Class names are imported as `styles.someName` and become unique in the built output, so they don’t conflict with other components.
- Layout: flexbox/grid, padding, max-width, responsive behavior. Colors use `var(--bg)`, `var(--text)`, etc., so they follow the active theme.

---

## 11. What happens when you do something (user flows)

### You type a city and click Search

1. You type in the search field → `onChange` is called → App’s `setSearchInput` updates `searchInput`.
2. You click “Search” (or press Enter) → form submits → `handleSubmit` in Search runs → `onSearch(trimmed)` is called → App’s `handleSearch(query)` runs.
3. `handleSearch` calls `setSearchInput(query)` and `loadWeather(query)`.
4. `loadWeather`: sets `error = null`, `loading = true` → after 700 ms it calls `getMockWeatherByCity(cityName)`. If data exists, `setWeather(data)`; otherwise `setError('City not found...')`. Then `setLoading(false)`.
5. React re-renders: Search shows “Searching…” then back to “Search”; main area shows “Loading weather…” then either CurrentWeather + Forecast or the error message.

### You click a favorite city

1. Favorites renders a button per city. You click one → `onSelect(city)` is called → App’s `handleFavoriteSelect(cityName)` runs.
2. It does `setSearchInput(cityName)` and `loadWeather(cityName)`.
3. Same loading flow as above; when done, that city’s weather is shown and the search input shows that city name.

### You click “Add to favorites”

1. CurrentWeather’s button calls `onAddFavorite(location.name)` → App’s `handleAddFavorite(cityName)`.
2. If the city is already in `favorites`, it’s removed with `removeFavorite`; otherwise added with `addFavorite`. Both update localStorage and return the new array.
3. App does `setFavorites(...)` with that new array. The Favorites list and the button label (“Favorited” vs “Add to favorites”) update on the next render.

### You switch unit or theme

- **Unit:** Clicking °C/m/s or °F/mph calls `setUnit('metric')` or `setUnit('imperial')`. CurrentWeather and Forecast receive `unit` and reformat temperatures and wind.
- **Theme:** Clicking the theme button toggles `theme` (light ↔ dark). The `useEffect` sets `document.documentElement.setAttribute('data-theme', theme)`, so the CSS variables switch and the whole UI restyles.

---

## 12. Key concepts recap

- **Single source of truth:** The main state (`weather`, `loading`, `error`, `searchInput`, `unit`, `theme`, `favorites`) lives in App. Children only receive data and callbacks via props.
- **Controlled input:** The search field’s value is `searchInput` from App; Search never keeps its own copy of the text. That’s why clicking a favorite can update the search box.
- **No backend:** Everything is in the browser: React state, mock data in `mockWeather.js`, favorites in localStorage.
- **Loading is simulated:** `delay(700)` before reading mock data gives a short loading state without any real network call.
- **Accessibility:** We use semantic HTML (`<main>`, `<section>`, `<label>`, etc.), `aria-label`, `aria-pressed`, `role="alert"` where it helps.

---

## 13. How to change or add things

- **Add a new city:** Edit `src/data/mockWeather.js`. Add a new key (e.g. `berlin`) with the same shape: `location`, `current`, `forecast` (5 days). The key must be the lowercase city name (or the key you’ll use in `NORMALIZED_KEYS`). If you need a different display name, set `location.name` and `location.country` accordingly.
- **Change loading time:** In `App.jsx`, change `SEARCH_DELAY_MS` (e.g. to 500 or 1000).
- **Change theme colors:** Edit the `:root` and `[data-theme="dark"]` blocks in `src/index.css`.
- **Add another unit system:** Add a new option in the unit toggle, extend `formatTemp` and `formatWind` in the components that use them, and pass the same unit prop.
- **Change number of forecast days:** Adjust the `forecast` arrays in `mockWeather.js` (and optionally the layout in `Forecast.jsx` if you want a different grid for more/fewer days).

If you want to plug in a **real weather API** later, you would replace the `delay` + `getMockWeatherByCity` part in `loadWeather` with a `fetch(url)` (or similar), parse the response, and map the API’s fields to the shape that `CurrentWeather` and `Forecast` expect (location, current, forecast array). The rest of the app can stay the same.

---

You now have a full picture of the project from HTML entry to mock data, state, components, and styling. Use this file as a reference while reading or changing the code.
