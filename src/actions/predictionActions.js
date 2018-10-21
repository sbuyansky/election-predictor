import * as actions from './actions';

export function predictElection(prediction) {
  return { type: actions.PREDICT_ELECTION, prediction };
}

export function predictHouse(prediction) {
  return { type: actions.PREDICT_HOUSE, prediction };
}
