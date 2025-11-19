import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface Location {
  id: number | string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  image?: string;
}

interface MapWithPinsProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export default function LeafletMap({
  locations,
  center,
  zoom = 5,
  className = "h-[500px] w-full",
}: MapWithPinsProps) {
  const initialCenter =
    center ||
    (locations.length > 0
      ? [locations[0].latitude, locations[0].longitude]
      : [0, 0]);

  return (
    <MapContainer
      center={initialCenter}
      zoom={zoom}
      className={className}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />

      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
          <Popup>
            <div>
              <h3 className="font-bold">{loc.name}</h3>
              {loc.description && <p>{loc.description}</p>}
              {loc.image && (
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="mt-2 h-auto w-full"
                />
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
