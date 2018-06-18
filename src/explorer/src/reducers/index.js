import { combineReducers } from 'redux';
import blockNumberReducer from './blockNumberReducer';
import blocksReducer from './blocksReducer';
import blockReducer from './blockReducer';
import txReducer from './txReducer';

export default combineReducers({
  blockNumber: blockNumberReducer,
  blocks: blocksReducer,
  block: blockReducer,
  tx: txReducer
});
