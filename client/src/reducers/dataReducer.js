import axios from 'axios';
import * as actions from '../actions/actions';

export default function dataReducer(state = {}, action) {
  switch (action.type) {
    case actions.LOAD_DATA:
      return state;
    case actions.SAVE_DATA:
      return state;
    default:
      return state;
  }
}
