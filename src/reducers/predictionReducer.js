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
    default:
      return state;
  }
}
