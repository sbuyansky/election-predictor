import axios from 'axios';
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

    case actions.SAVE_DATA:
      console.log(state);
      axios.post('http://localhost:5000/api/predictions', {
        predictions: state
      })
      .then((response) => {
        console.log("SAVE_DATA success");
        console.log(response);
      })
      .catch((error) => {
        console.log("SAVE_DATA error");
        console.log(error);
      });
      return state;

    case actions.LOAD_DATA:
      axios.get('http://localhost:5000/api/predictions', {
        string_identifier: state.string_identifier
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      return;

    default:
      return state;
  }
}
