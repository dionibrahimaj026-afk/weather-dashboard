import styles from './WeatherCharts.module.css'

const CHART_WIDTH = 280
const CHART_HEIGHT = 80
const PAD = { top: 8, right: 8, bottom: 24, left: 36 }
const PLOT_W = CHART_WIDTH - PAD.left - PAD.right
const PLOT_H = CHART_HEIGHT - PAD.top - PAD.bottom

function formatTemp(temp, unit) {
  if (unit === 'imperial') return Math.round((temp * 9) / 5 + 32)
  return Math.round(temp)
}

function formatWind(speedMs, unit) {
  if (unit === 'imperial') {
    return ((speedMs * 3600) / 1609.344).toFixed(1)
  }
  return speedMs.toFixed(1)
}

function TempCurve({ data, unit }) {
  if (!data || data.length === 0) return null
  const temps = data.map((d) => d.temp ?? 0)
  const minT = Math.min(...temps) - 2
  const maxT = Math.max(...temps) + 2
  const range = Math.max(maxT - minT, 1)
  const stepX = data.length > 1 ? PLOT_W / (data.length - 1) : PLOT_W

  const points = data.map((d, i) => {
    const x = PAD.left + i * stepX
    const y = PAD.top + PLOT_H - ((d.temp - minT) / range) * PLOT_H
    return `${x},${y}`
  }).join(' ')

  return (
    <div className={styles.chart}>
      <h3 className={styles.chartTitle}>Temperature</h3>
      <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className={styles.svg}>
        <defs>
          <linearGradient id="tempGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={PAD.left} y1={PAD.top + PLOT_H / 2} x2={PAD.left + PLOT_W} y2={PAD.top + PLOT_H / 2} className={styles.gridLine} />
        <polygon
          points={`${PAD.left},${PAD.top + PLOT_H} ${points} ${PAD.left + PLOT_W},${PAD.top + PLOT_H}`}
          fill="url(#tempGrad)"
        />
        <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => (
          <text
            key={d.hour}
            x={PAD.left + i * stepX}
            y={CHART_HEIGHT - 4}
            className={styles.label}
            textAnchor="middle"
          >
            {d.hour?.replace(':00', '') || i}
          </text>
        ))}
        <text x={PAD.left - 4} y={PAD.top + 4} className={styles.axisLabel} textAnchor="end">{formatTemp(maxT, unit)}°</text>
        <text x={PAD.left - 4} y={PAD.top + PLOT_H + 4} className={styles.axisLabel} textAnchor="end">{formatTemp(minT, unit)}°</text>
      </svg>
    </div>
  )
}

function WindChart({ data, unit }) {
  if (!data || data.length === 0) return null
  const values = data.map((d) => d.windSpeed ?? 0)
  const maxV = Math.max(...values, 1)
  const stepX = PLOT_W / data.length
  const barW = Math.max(4, stepX * 0.6)

  return (
    <div className={styles.chart}>
      <h3 className={styles.chartTitle}>Wind speed</h3>
      <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className={styles.svg}>
        {data.map((d, i) => {
          const v = d.windSpeed ?? 0
          const h = (v / maxV) * PLOT_H
          const x = PAD.left + i * stepX + (stepX - barW) / 2
          const y = PAD.top + PLOT_H - h
          return (
            <g key={d.hour}>
              <rect x={x} y={y} width={barW} height={h} rx={2} className={styles.windBar} />
              <text x={x + barW / 2} y={CHART_HEIGHT - 4} className={styles.label} textAnchor="middle">
                {d.hour?.replace(':00', '') || i}
              </text>
            </g>
          )
        })}
        <text x={PAD.left - 4} y={PAD.top + 4} className={styles.axisLabel} textAnchor="end">{formatWind(maxV, unit)} {unit === 'imperial' ? 'mph' : 'm/s'}</text>
        <text x={PAD.left - 4} y={PAD.top + PLOT_H + 4} className={styles.axisLabel} textAnchor="end">0</text>
      </svg>
    </div>
  )
}

function HumidityBars({ data }) {
  if (!data || data.length === 0) return null
  const stepX = PLOT_W / data.length
  const barW = Math.max(6, stepX * 0.7)

  return (
    <div className={styles.chart}>
      <h3 className={styles.chartTitle}>Humidity</h3>
      <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className={styles.svg}>
        {data.map((d, i) => {
          const v = d.humidity ?? 0
          const h = (v / 100) * PLOT_H
          const x = PAD.left + i * stepX + (stepX - barW) / 2
          const y = PAD.top + PLOT_H - h
          return (
            <g key={d.hour}>
              <rect x={x} y={y} width={barW} height={h} rx={2} className={styles.humidityBar} />
              <text x={x + barW / 2} y={y - 4} className={styles.barValue} textAnchor="middle">{v}%</text>
              <text x={x + barW / 2} y={CHART_HEIGHT - 4} className={styles.label} textAnchor="middle">
                {d.hour?.replace(':00', '') || i}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function WeatherCharts({ hourlyForecast, unit }) {
  if (!hourlyForecast || hourlyForecast.length === 0) return null

  return (
    <section className={styles.section} aria-labelledby="charts-heading">
      <h2 id="charts-heading" className={styles.heading}>Charts</h2>
      <div className={styles.grid}>
        <TempCurve data={hourlyForecast} unit={unit} />
        <WindChart data={hourlyForecast} unit={unit} />
        <HumidityBars data={hourlyForecast} />
      </div>
    </section>
  )
}
