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
  // const position = [51.505, -0.09];
  const { cities, isLoading } = useContext(CitiesContext);

  return (
    // <div className={styles.mapContainer} onClick={() => navigate('form')}>
    //   Map{lat}
    //   {lng}
    //   <button
    //     onClick={() => {
    //       setSearchParams({ lat: 23, lng: 50 });
    //     }}
    //   >
    //     Change pos
    //   </button>
    // </div>

    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        // >
        //   <TileLayer
        //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //     url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        //   />
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
