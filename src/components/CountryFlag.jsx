/**
 * Renders a country flag emoji from ISO 3166-1 alpha-2 code (e.g. GB, US).
 */
export function CountryFlag({ code, className = '', title }) {
  if (!code || typeof code !== 'string' || code.length !== 2) return null
  const upper = code.toUpperCase()
  const flag = upper
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join('')
  return (
    <span
      className={className}
      role="img"
      aria-label={title || `Flag of ${code}`}
      title={title}
    >
      {flag}
    </span>
  )
}
