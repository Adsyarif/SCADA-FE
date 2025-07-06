import dynamic from 'next/dynamic'
import type { LatLngExpression } from 'leaflet'
import type { LeafletMouseEvent } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { CircleDot, MapPin } from 'lucide-react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useMapEvent } from 'react-leaflet'

// dynamically-loaded Leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then(m => m.MapContainer),
  { ssr: false }
) as typeof import('react-leaflet')['MapContainer']

const TileLayer = dynamic(
  () => import('react-leaflet').then(m => m.TileLayer),
  { ssr: false }
) as typeof import('react-leaflet')['TileLayer']

const LeafletMarker = dynamic(
  () => import('react-leaflet').then(m => m.Marker),
  { ssr: false }
) as typeof import('react-leaflet')['Marker']

const LeafletCircle = dynamic(
  () => import('react-leaflet').then(m => m.Circle),
  { ssr: false }
) as typeof import('react-leaflet')['Circle']

// helper to capture map clicks
function MapClickHandler({
  onClick,
}: {
  onClick: (e: LeafletMouseEvent) => void
}) {
  useMapEvent('click', onClick)
  return null
}

interface MapComponentProps {
  center: LatLngExpression
  userPosition?: LatLngExpression
  radius?: number
  zoom?: number
}

export function MapComponent({
  center,
  userPosition,
  radius,
  zoom = 15,
}: MapComponentProps) {
  // build your DivIcons…
  let rtuIcon: any, userIcon: any
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

  const handleMapClick = (e: LeafletMouseEvent) => {
    // e.latlng.lat / e.latlng.lng …
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full h-full"
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* catch clicks */}
      <MapClickHandler onClick={handleMapClick} />

      {/* RTU pin */}
      {rtuIcon && <LeafletMarker position={center} icon={rtuIcon} />}

      {/* radius */}
      {radius != null && (
        <LeafletCircle
          center={center}
          radius={radius}
          pathOptions={{ fillOpacity: 0.1, color: 'blue' }}
        />
      )}

      {/* user pin */}
      {userPosition && userIcon && (
        <LeafletMarker position={userPosition} icon={userIcon} />
      )}
    </MapContainer>
  )
}
