import thunkMiddleware from 'redux-thunk'
import error from './reducers/errors'
import network from './reducers/network'
import fetching from './reducers/fetching'
import account from './reducers/accounts'
import tokenSale from './reducers/tokensales'
import tokenSalesList from './reducers/tokensaleslist'
import tokenPurchase from './reducers/tokenpurchases'
import tokenPurchasesList from './reducers/tokenpurchaseslist'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger';

const mainReducer = combineReducers({
  error,
  network,
  account,
  fetching,
  tokenSale,
  tokenSalesList,
  tokenPurchase,
  tokenPurchasesList,
});

const Store = createStore (
  mainReducer,
  applyMiddleware(thunkMiddleware,reduxLogger)
);

export default Store;
