const SEARCH_PLACE = 'SEARCH_PLACE';
const SEARCH_PLACE_SUCCESS = 'SEARCH_PLACE_SUCCESS';

export const searchPlace = (query: string) => ({
  type: SEARCH_PLACE,
  payload: query,
});

export const searchPlaceSuccess = (query: string, predictions: google.maps.places.AutocompletePrediction[]) => ({
  type: SEARCH_PLACE_SUCCESS,
  payload: {
    query,
    predictions,
  },
});
