import { FETCH_BLOCKS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BLOCKS:
      return action.payload;
    default:
      return state;
  }
}
