import React, { useEffect, useRef, useState } from 'react';
import { AutoComplete, Button, Select, SelectProps, Spin, message } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

import { Wrapper, Status } from '@googlemaps/react-wrapper';

import debounce from 'lodash/debounce';
import { DebounceSelect } from './components/DebounceSelect';

import { useDispatch, useSelector } from 'react-redux';
import { searchPlace } from './actions/place';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

type AutoCompleteResult = {
  description: string;
  place_id: string;
  reference: string;
  matched_substrings: { offset: number; length: number }[];
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: { offset: number; length: number }[];
    secondary_text: string;
  };
  terms: { offset: number; value: string }[];
  types: string[];
};

function MapComponent({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    const marker = new window.google.maps.Marker({
      position: center,
    });
    marker.setMap(map);
  });

  return <div style={{ width: '100%', height: '400px', borderRadius: '16px' }} ref={ref} id="map" />;
}

function App() {
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const [query, setQuery] = useState<string>('');

  const [location, setLocation] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const zoom = 4;

  const Loading = () => (
    <div className="App">
      <Spin />
    </div>
  );
  const AutocompleteApp = () => {
    const autocompleteService = new google.maps.places.AutocompleteService();

    const handleSearch = (newValue: string) => {
      autocompleteService.getPlacePredictions({ input: newValue }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setOptions(predictions?.map((d) => ({ value: d.place_id, label: d.description })));
        }
      });
    };

    const handleSelect = (value: string) => {
      const geolocationService = new google.maps.Geocoder();

      geolocationService.geocode({ placeId: value }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const { lat, lng } = results[0].geometry.location;
          setLocation({ lat: lat(), lng: lng() });
        }
      });
    };

    return (
      <div className="App">
        <div
          style={{
            maxWidth: '600px',
            backgroundColor: '#B2BEB5',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <h1
            style={{
              color: '#fff',
              fontSize: '36px',
              fontWeight: 'bold',
              marginBottom: 0,
            }}
          >
            React + Ant Design + TypeScript
          </h1>
          <AutoComplete
            options={options}
            style={{ width: '100%' }}
            value={query}
            onSelect={handleSelect}
            onSearch={handleSearch}
            placeholder="Search for location"
          />
          <MapComponent center={location} zoom={zoom} />
        </div>
      </div>
    );
  };

  const render = (status: string) => {
    console.log('status', status);
    switch (status) {
      case Status.LOADING:
        return <Loading />;
      case Status.FAILURE:
        return <Loading />;
      case Status.SUCCESS:
        return <AutocompleteApp />;
    }
  };

  return (
    <Wrapper libraries={['places', 'marker']} apiKey={'AIzaSyC-_8Vc4Y8nn6zNnCDBjNgb11-x9xo5nUQ'} render={render} />
  );
}

export default App;
