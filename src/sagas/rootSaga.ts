import { takeLatest } from 'redux-saga/effects';
import { handleSearchPlace } from './handlers/places';

export function* watchSearchPlace() {
  yield takeLatest('SEARCH_PLACE', handleSearchPlace);
}
