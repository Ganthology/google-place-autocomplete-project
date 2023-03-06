import React, { useEffect, useRef, useState } from 'react';
import { AutoComplete, Button, Select, SelectProps, Spin, message } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

import { Wrapper, Status } from '@googlemaps/react-wrapper';

import debounce from 'lodash/debounce';
import { DebounceSelect } from './components/DebounceSelect';

import { useDispatch, useSelector } from 'react-redux';
import { searchPlace } from './actions/place';
import { AutocompleteApp } from './features/AutoCompleteApp';
import { Loading } from './components/Loading';

function App() {
  const render = (status: string) => {
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
