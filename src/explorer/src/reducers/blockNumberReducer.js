import { FETCH_BLOCKNUMBER } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_BLOCKNUMBER:
      return action.payload;
    default:
      return state;
  }
}
