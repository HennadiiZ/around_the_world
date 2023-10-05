import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useContext, useState } from 'react';
import { CitiesContext } from '../../contexts/CitiesContext';

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities, isLoading } = useContext(CitiesContext);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          // <Marker position={city.position} key={city.id}>
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>
              <span>({city.country})</span>
              <span> {city.emoji}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
