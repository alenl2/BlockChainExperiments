import { FETCH_TX } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TX:
      return action.payload;
    default:
      return state;
  }
}
