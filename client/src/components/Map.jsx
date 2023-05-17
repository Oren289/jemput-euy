import React, { useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import '@reach/combobox/styles.css';
import UsePlacesAutocomplete from './UsePlacesAutocomplete';

// const Map = () => {
//   const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyDCzjmZxIrRDVlC4L_JPUC8VXl43LNC2qQ' });

//   if (!isLoaded) return <div>Loading...</div>;

//   return <MapRender />;
// };

const Map = () => {
  const center = useMemo(() => ({ lat: -6.919548, lng: 107.618196 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <UsePlacesAutocomplete setSelected={setSelected}></UsePlacesAutocomplete>
      <GoogleMap zoom={13} center={center} mapContainerClassName='map-container' onClick={(ev) => setSelected({ lat: ev.latLng.toJSON().lat, lng: ev.latLng.toJSON().lng })}>
        {selected && <MarkerF position={selected}></MarkerF>}
      </GoogleMap>
    </>
  );
};

export default Map;
