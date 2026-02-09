import { useState, useEffect } from 'react'

/**
 * Debounce a value by delay ms.
 * @param {*} value - Value to debounce
 * @param {number} delayMs - Delay in ms (e.g. 300)
 * @returns Debounced value
 */
export function useDebounce(value, delayMs) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debouncedValue
}
