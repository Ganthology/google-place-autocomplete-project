import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { placeReducer } from '../reducers';
import { watchSearchPlace } from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(placeReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchSearchPlace);

export default store;
