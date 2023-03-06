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

function MyMapComponent({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div style={{ width: '400px', height: '400px' }} ref={ref} id="map" />;
}

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

function App() {
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const [query, setQuery] = useState<string>('');

  const dispatch = useDispatch();

  const predictions = useSelector((state: any) => state.predictions.byId[query]);

  console.log('predictions', predictions);

  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  const Loading = () => (
    <div className="App">
      <Spin />
    </div>
  );

  const AutocompleteApp = () => {
    const autocompleteService = new google.maps.places.AutocompleteService();

    const handleSearch = (newValue: string) => {
      dispatch(searchPlace(newValue));
    };

    return (
      <div className="App">
        <h1>React + Ant Design + TypeScript</h1>
        <AutoComplete
          options={options}
          style={{ width: 200 }}
          // onSelect={onSelect}
          onSearch={handleSearch}
          placeholder="input here"
        />
        {/* <MyMapComponent center={center} zoom={zoom} /> */}
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

  return <Wrapper libraries={['places']} apiKey={'AIzaSyC-_8Vc4Y8nn6zNnCDBjNgb11-x9xo5nUQ'} render={render} />;
}

export default App;
