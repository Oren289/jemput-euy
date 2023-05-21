import React, { useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import '@reach/combobox/styles.css';

const MapSimple = ({ coordinate }) => {
  const [center, setCenter] = useState({ lat: -6.919548, lng: 107.618196 });

  return (
    <GoogleMap zoom={13} center={coordinate.lat ? coordinate : center} mapContainerClassName='map-container'>
      {coordinate && <MarkerF position={coordinate}></MarkerF>}
    </GoogleMap>
  );
};

export default MapSimple;
