import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox';

const UsePlacesAutocomplete = ({ setCoordinate, setCenter }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setCoordinate({ lat, lng });
    setCenter({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} className='form-control no-outline mb-2' aria-labelledby='demo' placeholder='Cari alamat...' />
      <ComboboxPopover>
        <ComboboxList aria-labelledby='demo'>{status === 'OK' && data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description}></ComboboxOption>)}</ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default UsePlacesAutocomplete;
