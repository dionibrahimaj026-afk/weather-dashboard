# Weather Dashboard

A simple weather dashboard that shows current weather and a short forecast for a searched location. Built with React and **mock data only** (no backend, no real API).

## How to run

```bash
npm install
npm start
```

Then open [http://localhost:5173](http://localhost:5173).  
To build for production: `npm run build`. To preview the build: `npm run preview`.

## Where mock data lives

Mock weather data is in **`src/data/mockWeather.js`**. It defines 7 cities: **London**, **New York**, **Tokyo**, **Paris**, **Sydney**, **Berlin**, and **Oklahoma City**. Each city has:

- **Current weather**: temp, feels like, description, icon, humidity, wind speed (metric).
- **Forecast**: **7 days** with date, min/max temp, description, icon.
- **Natural hazards** (in mock data): heavy rain, high wind, **tornado** (e.g. Oklahoma City), **snow storm** (e.g. New York, Berlin forecast).

Searching for any other city shows a “City not found” message. No backend or API is used; everything is driven by this file.

## Features

- **Search** – City name input and Search button; loads weather from mock data with a short loading delay. “City not found” if the city isn’t in the mock list.
- **Current weather** – Location, current temp, “feels like”, description, icon, humidity, wind speed.
- **Units** – Toggle between metric (°C, m/s) and imperial (°F, mph).
- **Forecast** – Next **7 days**: date, min/max temp, description, icon (card layout). Includes natural hazard conditions (tornado, snow storm) where defined in mock data.
- **Alerts** – Severe weather alerts for heavy rain, high wind, tornado, and snow storm (amber or red banner).
- **Favorites** – Add current city to favorites; list of favorite cities; click one to load its weather. Favorites are stored in **localStorage** only.
- **UI** – Search at top, current weather in the middle, forecast below. Responsive layout. Dark/light theme toggle.

## Tech stack

- **Frontend**: React (Vite), HTML, CSS (no Tailwind).
- **Data**: Mock JSON-like data in `src/data/mockWeather.js` — no backend, no database.

## Changelog

- **v1.1.0** – Added Berlin to mock cities; added app footer with version.
