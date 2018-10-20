export default function predictionReducer(state = {}, action) {
  switch (action.type) {
    case 'PREDICT_ELECTION':
      return (
        {
          ...state,
          elections: {
            ...state.elections,
            [action.prediction.stateName]: {
              ...state.elections[action.prediction.stateName],
              projectedWinner: action.prediction.candidate,
            },
          },
        });
    default:
      return state;
  }
}
