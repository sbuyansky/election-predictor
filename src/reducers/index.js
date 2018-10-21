import { combineReducers } from 'redux';
import predictions from './predictionReducer';
import data from './dataReducer';

const rootReducer = combineReducers({
  predictions,
  data,
});

export default rootReducer;
