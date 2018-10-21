import * as actions from '../actions/actions';

export default function dataReducer(state = {}, action) {
  switch (action.type) {
    case actions.LOAD_DATA:
    default:
      return state;
  }
}
