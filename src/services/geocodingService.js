import { business } from '../data/business'

let currentRequest = null

export const geocodeAddress = async (address) => {
  if (!address) {
    throw new Error(
      'No se proporcionó una dirección.'
    )
  }

  const cacheKey =
    `bakery-location:${business.countryCode}:${address}`

  try {
    const cachedLocation = sessionStorage.getItem(cacheKey)
    if (cachedLocation) return JSON.parse(cachedLocation)
  } catch {
    // Location lookup also works when browser storage is unavailable.
  }

  if (currentRequest) {
    return currentRequest
  }

  const url =
    'https://nominatim.openstreetmap.org/search' +
    `?format=jsonv2` +
    `&limit=1` +
    `&countrycodes=${business.countryCode}` +
    `&accept-language=en` +
    `&q=${encodeURIComponent(address)}`

  currentRequest = fetch(url, {
    signal: AbortSignal.timeout(10000),
    headers: {
      Accept: 'application/json',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(
          'No fue posible consultar la ubicación.'
        )
      }

      const results =
        await response.json()

      if (results.length === 0) {
        throw new Error(
          'No encontramos esa dirección.'
        )
      }

      const result = results[0]

      const location = {
        lat: Number(result.lat),

        lng: Number(result.lon),

        displayName:
          result.display_name,
      }

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(location))
      } catch {
        // Caching is optional.
      }

      return location
    })
    .finally(() => {
      currentRequest = null
    })

  return currentRequest
}
