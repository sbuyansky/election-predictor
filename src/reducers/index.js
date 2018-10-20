import {combineReducers} from 'redux';
import predictions from "./predictionReducer";

const rootReducer = combineReducers({
    predictions
});

export default rootReducer;