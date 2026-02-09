# Weather Dashboard – Mermaid Diagrams

View these in any Markdown viewer that supports Mermaid (e.g. GitHub, VS Code with Mermaid extension, or [mermaid.live](https://mermaid.live)).

---

## 1. Component & data flow

```mermaid
flowchart TB
    subgraph UI[" "]
        App[App.jsx]
        Search[Search]
        CurrentWeather[CurrentWeather]
        Forecast[Forecast]
        Favorites[Favorites]
    end

    subgraph Data[" "]
        Mock["mockWeather.js"]
        LS[localStorage]
    end

    App --> Search
    App --> CurrentWeather
    App --> Forecast
    App --> Favorites

    Search -->|"city name"| App
    App -->|"loadWeather()"| Mock
    Mock -->|"weather data"| App
    App -->|"weather, unit"| CurrentWeather
    App -->|"forecast, unit"| Forecast
    Favorites -->|"select city"| App
    App -->|"add/remove"| LS
    LS -->|"favorites list"| App
    App -->|"favorites, currentCity"| Favorites
```

---

## 2. User flow (search → result)

```mermaid
flowchart LR
    A[User types city] --> B[Click Search]
    B --> C[Loading 0.7s]
    C --> D{Mock data?}
    D -->|Found| E[Show current + forecast]
    D -->|Not found| F[Show "City not found"]
    E --> G[Can add to Favorites]
    G --> H[Click favorite later]
    H --> E
```

---

## 3. App state (simplified)

```mermaid
flowchart LR
    subgraph State["App state"]
        weather[weather]
        loading[loading]
        error[error]
        searchInput[searchInput]
        unit[unit]
        theme[theme]
        favorites[favorites]
    end

    weather --> CurrentWeather
    weather --> Forecast
    searchInput --> Search
    favorites --> Favorites
    unit --> CurrentWeather
    unit --> Forecast
```

---

## 4. File structure (high level)

```mermaid
flowchart TD
    index["index.html"] --> main["main.jsx"]
    main --> App["App.jsx"]
    App --> Search["Search.jsx"]
    App --> CurrentWeather["CurrentWeather.jsx"]
    App --> Forecast["Forecast.jsx"]
    App --> Favorites["Favorites.jsx"]
    App --> mock["data/mockWeather.js"]
    App --> storage["utils/storage.js"]
    App --> delay["utils/delay.js"]
    CurrentWeather --> WeatherIcon["WeatherIcon.jsx"]
    Forecast --> WeatherIcon
```
