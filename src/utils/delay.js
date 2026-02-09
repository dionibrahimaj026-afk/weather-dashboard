/**
 * Simulate network delay (e.g. 0.5–1s) when loading mock data.
 */
export function delay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
