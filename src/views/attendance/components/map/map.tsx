import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
    return (
        <MapContainer 
            style={{ height: "100%", width: "100%" }}
            center={[51.505, -0.09]} zoom={32} scrollWheelZoom={false}
            >
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}