import { useI18n } from '../i18n/useI18n'
import {
  useEffect,
  useRef,
  useState,
} from 'react'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { business } from '../data/business'

import {
  geocodeAddress,
} from '../services/geocodingService'

import './OpenStreetMap.css'

function OpenStreetMap() {
  const { t } = useI18n()

  const mapContainerRef =
    useRef(null)

  const mapInstanceRef =
    useRef(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [locationStatus, setLocationStatus] =
    useState('')

  useEffect(() => {
    let cancelled = false

    const createMap = async () => {
      if (
        !mapContainerRef.current ||
        mapInstanceRef.current
      ) {
        return
      }

      setIsLoading(true)

      let location

      try {
        location =
          await geocodeAddress(
            business.address
          )

        if (cancelled) {
          return
        }

        setLocationStatus(
          location.displayName
        )

      } catch (error) {

        console.error(
          'Error buscando ubicación:',
          error
        )

        if (cancelled) {
          return
        }

        location = {
          lat: business.location.lat,
          lng: business.location.lng,
        }

        setLocationStatus(
          'Usando ubicación aproximada'
        )
      }

      const map = L.map(
        mapContainerRef.current,
        {
          scrollWheelZoom: false,
        }
      ).setView(
        [
          location.lat,
          location.lng,
        ],
        business.location.zoom
      )

      L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,

          attribution:
            '&copy; OpenStreetMap contributors',
        }
      ).addTo(map)

      const marker = L.circleMarker(
        [
          location.lat,
          location.lng,
        ],
        {
          radius: 10,

          color: '#fffdf8',

          weight: 4,

          fillColor: '#b85732',

          fillOpacity: 1,
        }
      )

      marker
        .addTo(map)
        .bindPopup(
          `
            <strong>
              ${business.name}
            </strong>

            <br>

            ${business.address}
          `
        )

      mapInstanceRef.current =
        map

      setIsLoading(false)

      setTimeout(() => {
        map.invalidateSize()
      }, 0)
    }

    createMap()

    return () => {
      cancelled = true

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()

        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="open-street-map__wrapper">

      <div
        ref={mapContainerRef}
        className="open-street-map"
        aria-label={
          t('Mapa de {name}', { name: business.name })
        }
      />

      {isLoading && (
        <div className="open-street-map__loading">

          <span>📍</span>

          <strong>{t("Buscando ubicación...")}</strong>

          <p>{t("Estamos localizando la panadería en el mapa.")}</p>

        </div>
      )}

      {!isLoading &&
        locationStatus && (

        <div className="open-street-map__status">

          <span>📍</span>

          <span>
            {t(locationStatus)}
          </span>

        </div>

      )}

    </div>
  )
}

export default OpenStreetMap
