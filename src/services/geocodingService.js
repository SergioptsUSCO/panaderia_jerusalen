let currentRequest = null

export const geocodeAddress = async (address) => {
  if (!address) {
    throw new Error(
      'No se proporcionó una dirección.'
    )
  }

  const cacheKey =
    `bakery-location:${address}`

  const cachedLocation =
    sessionStorage.getItem(cacheKey)

  if (cachedLocation) {
    return JSON.parse(cachedLocation)
  }

  if (currentRequest) {
    return currentRequest
  }

  const url =
    'https://nominatim.openstreetmap.org/search' +
    `?format=jsonv2` +
    `&limit=1` +
    `&q=${encodeURIComponent(address)}`

  currentRequest = fetch(url, {
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

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify(location)
      )

      return location
    })
    .finally(() => {
      currentRequest = null
    })

  return currentRequest
}