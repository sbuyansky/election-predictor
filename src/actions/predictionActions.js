/* eslint import/prefer-default-export: 0 */
import * as actions from './actions';

export function predictElection(prediction) {
  return { type: actions.PREDICT_ELECTION, prediction };
}
