import { call, put } from 'redux-saga/effects';
import { requestSearchPlace } from '../requests/places';
import { searchPlaceSuccess } from '../../actions/place';

export function* handleSearchPlace(action) {
  try {
    const predictions = yield call(requestSearchPlace, action.payload.query);
    yield put(searchPlaceSuccess(action.payload.query, predictions));
  } catch (error) {
    // yield put(searchPlaceFailure(error));
    console.log(error);
  }
}
