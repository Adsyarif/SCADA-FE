import dynamic from 'next/dynamic'
import type { LatLngExpression, DivIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CircleDot, MapPin } from 'lucide-react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useEffect, useState } from 'react'
import { type MapContainerProps } from 'react-leaflet' 

const MapContainer = dynamic<MapContainerProps>(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false })
const Marker   = dynamic(() => import('react-leaflet').then((m) => m.Marker),   { ssr: false })
const Circle   = dynamic(() => import('react-leaflet').then((m) => m.Circle),   { ssr: false })

interface MapComponentProps {
  center:      LatLngExpression
  userPosition?: LatLngExpression
  radius?:     number
  zoom?:       number
}

export default function MapComponent({
  center,
  userPosition,
  radius,
  zoom = 15,
}: MapComponentProps) {
  const [rtuIcon, setRtuIcon] = useState<DivIcon>()
  const [userIcon, setUserIcon] = useState<DivIcon>()

  useEffect(() => {
    // Dynamically import leaflet only on the client-side
    const L = require('leaflet')
    setRtuIcon(new L.DivIcon({
      html: renderToStaticMarkup(<MapPin color="red" size={32} />),
      className: '',
      iconAnchor: [16, 32],
    }))
    setUserIcon(new L.DivIcon({
      html: renderToStaticMarkup(<CircleDot color="blue" size={24} />),
      className: '',
      iconAnchor: [12, 24],
    }))
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* RTU marker */}
      {rtuIcon && <Marker position={center} icon={rtuIcon} />}

      {/* Geofence circle */}
      {radius && (
        <Circle
          center={center}
          radius={radius}
          pathOptions={{ fillOpacity: 0.1, color: 'blue' }}
        />
      )}

      {/* User marker */}
      {userPosition && userIcon && (
        <Marker position={userPosition} icon={userIcon} />
      )}
    </MapContainer>
  )
}
