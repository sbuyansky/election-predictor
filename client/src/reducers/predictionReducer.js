import { toast } from 'react-toastify';
import * as actions from '../actions/actions';

export default function predictionReducer(state = {}, action) {
  let error, message;
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
      toast.success(`Successfully loaded: ${state.predictionId}`);
      return state;
    
    case actions.LOAD_DATA_FAIL:
      error = action.error;
      message = `Error loading "${state.predictionId}"`;

      if(error && error.response && error.response.data){
        message += `: ${error.response.data}`;
      }
      else if(error && error.data){
        message += `: ${error.data}`;
      }

      toast.error(message);
      return state;

    case actions.SAVE_DATA_SUCCESS:
      toast.success(`Successfully saved`);
      return state;
    
    case actions.SAVE_DATA_FAIL:
      message = `Error saving "${state.predictionId}"`;

      if(action.error && action.error.response && action.error.response.data){
        message += `: ${action.error.response.data}`;
      }
      else if(action.error && action.error.data){
        message += `: ${action.error.data}`;
      }

      toast.error(message);
      return state;

    default:
      return state;
  }
}
