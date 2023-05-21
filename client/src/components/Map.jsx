import React, { useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import '@reach/combobox/styles.css';
import UsePlacesAutocomplete from './UsePlacesAutocomplete';

// const Map = () => {
//   const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyDCzjmZxIrRDVlC4L_JPUC8VXl43LNC2qQ' });

//   if (!isLoaded) return <div>Loading...</div>;

//   return <MapRender />;
// };

const Map = ({ coordinate, setCoordinate }) => {
  const [center, setCenter] = useState({ lat: -6.919548, lng: 107.618196 });
  // const center = useMemo(() => ({ lat: -6.919548, lng: 107.618196 }), []);

  return (
    <>
      <UsePlacesAutocomplete setCoordinate={setCoordinate} setCenter={setCenter}></UsePlacesAutocomplete>
      <GoogleMap zoom={13} center={coordinate.lat !== '' ? coordinate : center} mapContainerClassName='map-container' onClick={(ev) => setCoordinate({ lat: ev.latLng.toJSON().lat, lng: ev.latLng.toJSON().lng })}>
        {coordinate && <MarkerF position={coordinate}></MarkerF>}
      </GoogleMap>
    </>
  );
};

export default Map;
