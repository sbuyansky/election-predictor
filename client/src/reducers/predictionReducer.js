import * as actions from '../actions/actions';

export default function predictionReducer(state = {}, action) {
  switch (action.type) {
    
    case actions.PREDICT_ELECTION:
      return (
        {
          ...state,
          [action.prediction.electionType]: {
            ...state[action.prediction.electionType],
            [action.prediction.stateName]: {
              ...state[action.prediction.electionType][action.prediction.stateName],
              projectedWinner: action.prediction.candidate,
            },
          },
        });

    case actions.PREDICT_HOUSE:
      return (
        {
          ...state,
          [action.prediction.electionType]: action.prediction.numDemSeats,
        });

    case actions.UPDATE_PREDICTION_ID:
        return {
          ...state,
          predictionId : action.predictionId
        }

    case actions.LOAD_DATA_SUCCESS:
      state = action.payload.data.predictions;
      return state;

    default:
      return state;
  }
}
