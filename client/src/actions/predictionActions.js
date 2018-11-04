import * as actions from './actions';

export function predictElection(prediction) {
  return { type: actions.PREDICT_ELECTION, prediction };
}

export function predictHouse(prediction) {
  return { type: actions.PREDICT_HOUSE, prediction };
}

export function saveData() {
  return { type: actions.SAVE_DATA };
}

export function loadData() {
  return { type: actions.LOAD_DATA };
}