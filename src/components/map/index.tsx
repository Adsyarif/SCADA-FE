import dynamic from 'next/dynamic'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CircleDot, MapPin } from 'lucide-react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MapContainerProps } from 'react-leaflet'

// Solution: Type assertion workaround
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer as React.ComponentType<MapContainerProps>),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
)

interface MapComponentProps {
  center: LatLngExpression
  userPosition?: LatLngExpression
  radius?: number
  zoom?: number
}

export default function MapComponent({
  center,
  userPosition,
  radius,
  zoom = 15,
}: MapComponentProps) {
  let rtuIcon: any
  let userIcon: any
  
  if (typeof window !== 'undefined') {
    const L = require('leaflet')
    rtuIcon = new L.DivIcon({
      html: renderToStaticMarkup(<MapPin color="red" size={32} />),
      className: '',
      iconAnchor: [16, 32],
    })
    userIcon = new L.DivIcon({
      html: renderToStaticMarkup(<CircleDot color="blue" size={24} />),
      className: '',
      iconAnchor: [12, 24],
    })
  }

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

      {rtuIcon && <Marker position={center} icon={rtuIcon} />}
      {radius && (
        <Circle
          center={center}
          radius={radius}
          pathOptions={{ fillOpacity: 0.1, color: 'blue' }}
        />
      )}
      {userPosition && userIcon && (
        <Marker position={userPosition} icon={userIcon} />
      )}
    </MapContainer>
  )
}