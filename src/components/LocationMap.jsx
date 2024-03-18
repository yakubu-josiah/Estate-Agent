import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

export default function LocationMap({position}) {
  return (
    <div className="w-full h-[200px] md:h-full overflow-x-hidden mt-6 md:mt-0">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }} className="h-full ">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
             Here's the pin<br /> for this property.
            </Popup>
        </Marker>
        </MapContainer>
    </div>
  )
}
