import * as actions from './actions';

export function predictElection(prediction) {
  return { type: actions.PREDICT_ELECTION, prediction };
}

export function predictHouse(prediction) {
  return { type: actions.PREDICT_HOUSE, prediction };
}

export function updatePredictionId(predictionId) {
  return { type: actions.UPDATE_PREDICTION_ID, predictionId };
}


export function saveData(predictions) {
  return {
    type: actions.SAVE_DATA,
    payload: {
      request: {
          method: 'POST',
          url: '/predictions',
          data: {
            predictions: predictions
          }
      }
  }
  };
}

export function loadData(string_identifier) {
  return { 
    type: actions.LOAD_DATA,
    payload: {
      request: {
        params:  {
          string_identifier
        },
        url: '/predictions'
      }
    }
  };
}