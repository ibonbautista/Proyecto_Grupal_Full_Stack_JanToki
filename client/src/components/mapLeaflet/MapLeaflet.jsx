
import { MapContainer, TileLayer, Marker, useMap} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./MapLeaflet.css";

// Solución al problema de iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapLeaflet({ latitude, longitude }) {
	const position = [parseFloat(latitude), parseFloat(longitude)];
	
	return (
	  <MapContainer center={position} zoom={12} style={{ height: '100vh' }}>
		<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			return (
			  <Marker position={position} />
			);
	  </MapContainer>
	);
}

export default MapLeaflet;