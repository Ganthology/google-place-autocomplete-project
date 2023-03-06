// This is a reducer for the place state
const initialState = {
  predictions: {
    byId: {
      empty: [],
    },
    allId: ['empty'],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PLACE_SUCCESS:
      return {
        ...state,
        predictions: {
          byId: {
            ...state.predictions.byId,
            [action.payload.query]: action.payload.predictions,
          },
          allId: [...state.predictions.allId, action.payload.query],
        },
      };
    default:
      return state;
  }
};
