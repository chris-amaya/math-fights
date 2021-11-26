export function getID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 6)
}

/**
 * helper to mock properties from a class, object
 *
 * @example
 * mock(room, 'rooms', [])
 */
export const mock = <T extends unknown, K extends keyof T>(
  object: T,
  property: K,
  value: T[K],
  options?: {
    enumerable?: boolean
    configurable?: boolean
    writable?: boolean
  },
) => {
  Object.defineProperty(object, property, {get: () => value, ...options})
}
